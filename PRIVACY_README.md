# Privacy & Security Features

## Overview

The Expense Tracker implements comprehensive privacy and security features to protect user data and ensure compliance with data protection standards.

## 🔒 Security Features

### 1. Firestore Security Rules

All user data is protected by strict Firestore security rules that ensure:

- Users can only access their own data
- No cross-user data leakage
- Secure data isolation

**Location:** `firestore.rules`

### 2. Data Encryption

- Sensitive expense data can be encrypted before storage
- Uses Web Crypto API with user-specific keys
- Configurable via privacy settings

### 3. Privacy Settings

Users can control:

- Data encryption preferences
- Profile visibility
- Data sharing permissions
- Data retention policies
- Analytics consent

## 🚀 Setup Instructions

### 1. Deploy Firestore Security Rules

1. Go to Firebase Console → Firestore Database
2. Click on "Rules" tab
3. Replace the default rules with the content from `firestore.rules`
4. Click "Publish"

### 2. Enable Required Firebase Services

1. **Firestore**: Enable Firestore Database
2. **Authentication**: Enable Email/Password, Google, and GitHub providers
3. **Storage**: (Optional) For future file attachments

### 3. Environment Variables

Ensure your `.env` file includes:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📊 Data Structure

### User Data Isolation

All collections include `userId` field for proper data isolation:

```typescript
interface Expense {
  id: string;
  userId: string; // Ensures privacy
  description: string;
  amount: number;
  category: string;
  date: string;
  isPrivate?: boolean;
}
```

### Privacy Settings

```typescript
interface PrivacySettings {
  userId: string;
  dataEncryption: boolean;
  profileVisibility: 'private' | 'public';
  expenseSharing: boolean;
  dataRetention: '1year' | '2years' | 'forever';
  analyticsConsent: boolean;
}
```

## 🔐 Privacy Controls

### Data Encryption

- **Enabled by default** for new users
- Uses AES-GCM encryption with user-specific keys
- Can be disabled in privacy settings

### Data Export

- Users can export all their data as JSON
- Includes expenses, budgets, categories, and settings
- Download as timestamped file

### Data Deletion

- Complete data deletion functionality
- Removes all user data from Firestore
- Permanent action with confirmation dialog

### Analytics Consent

- Optional usage analytics
- Disabled by default
- Respects user privacy preferences

## 🛡️ Security Best Practices

### 1. Data Sanitization

Sensitive data is automatically sanitized before logging:

```typescript
PrivacyManager.sanitizeData({
  email: 'user@example.com',
  password: 'secret123',
});
// Returns: { email: '[REDACTED]', password: '[REDACTED]' }
```

### 2. Access Control

- All database operations check user authentication
- Firestore rules prevent unauthorized access
- Client-side validation with server-side enforcement

### 3. Secure Storage

- Firebase handles data encryption at rest
- User-specific encryption for sensitive fields
- Secure token management

## 📱 User Experience

### Privacy Settings Page

Accessible via navbar "Privacy" link for authenticated users:

- `/privacy` - Privacy settings and data management

### Features Available:

- Toggle data encryption
- Control profile visibility
- Manage data retention
- Export personal data
- Delete all data
- Analytics preferences

## 🔧 Development Notes

### Testing Privacy Features

```bash
# Test data export
npm run dev
# Navigate to /privacy and click "Export My Data"

# Test data deletion (use test account)
# Navigate to /privacy and click "Delete All My Data"
```

### Adding New Data Types

When adding new collections, ensure:

1. Include `userId: string` field
2. Update Firestore security rules
3. Add to data export/delete functions
4. Consider encryption for sensitive fields

## 📋 Compliance

This implementation helps with:

- **GDPR**: Data export, deletion, consent management
- **CCPA**: Privacy controls, data portability
- **General Privacy**: User data protection, transparency

## 🚨 Important Notes

- **Data Deletion is Permanent**: No recovery possible
- **Encryption Keys**: User-specific, cannot be recovered if lost
- **Backup Data**: Users should export data before deletion
- **Firebase Rules**: Must be deployed to production

## 🔗 Related Files

- `src/utils/privacy.ts` - Privacy management utilities
- `src/utils/dataManagement.ts` - Data export/delete functions
- `src/features/privacy/PrivacySettings.tsx` - Privacy settings UI
- `firestore.rules` - Database security rules
- `src/types/index.ts` - Updated data types with privacy fields
