import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../services/firebase';
import type { PrivacySettings } from '../types';

const db = getFirestore();

// Simple encryption/decryption using Web Crypto API
class DataEncryption {
  private static async getKey(): Promise<CryptoKey> {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    // Use user ID as part of the key derivation
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(userId + 'expense-tracker-salt'),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey'],
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('expense-tracker-salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );
  }

  static async encrypt(text: string): Promise<string> {
    const key = await this.getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(text),
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  static async decrypt(encryptedText: string): Promise<string> {
    const key = await this.getKey();
    const combined = new Uint8Array(
      atob(encryptedText)
        .split('')
        .map((c) => c.charCodeAt(0)),
    );

    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted,
    );

    return new TextDecoder().decode(decrypted);
  }
}

// Privacy settings management
export class PrivacyManager {
  static async getPrivacySettings(userId: string): Promise<PrivacySettings> {
    const docRef = doc(db, 'privacySettings', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PrivacySettings;
    }

    // Default privacy settings
    const defaultSettings: PrivacySettings = {
      userId,
      dataEncryption: true,
      profileVisibility: 'private',
      expenseSharing: false,
      dataRetention: 'forever',
      analyticsConsent: false,
    };

    await this.updatePrivacySettings(defaultSettings);
    return defaultSettings;
  }

  static async updatePrivacySettings(settings: PrivacySettings): Promise<void> {
    const docRef = doc(db, 'privacySettings', settings.userId);
    await setDoc(docRef, settings);
  }

  static async encryptSensitiveData(data: string): Promise<string> {
    const settings = await this.getPrivacySettings(auth.currentUser!.uid);
    if (settings.dataEncryption) {
      return await DataEncryption.encrypt(data);
    }
    return data;
  }

  static async decryptSensitiveData(encryptedData: string): Promise<string> {
    const settings = await this.getPrivacySettings(auth.currentUser!.uid);
    if (settings.dataEncryption) {
      return await DataEncryption.decrypt(encryptedData);
    }
    return encryptedData;
  }

  // Data sanitization - remove sensitive information before logging/analytics
  static sanitizeData(data: any): any {
    const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'email'];
    const sanitized = { ...data };

    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  // Check if user has consented to analytics
  static async canUseAnalytics(): Promise<boolean> {
    if (!auth.currentUser) return false;
    const settings = await this.getPrivacySettings(auth.currentUser.uid);
    return settings.analyticsConsent;
  }
}

export { DataEncryption };
