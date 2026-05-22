import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const readServiceAccount = () => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return serviceAccount;
  }

  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  const localPaths = [
    path.resolve(process.cwd(), 'serviceAccountKey.json'),
    path.resolve(process.cwd(), 'firebase-service-account.json'),
  ];

  const serviceAccountPath = localPaths.find((filePath) => fs.existsSync(filePath));

  if (!serviceAccountPath) {
    throw new Error('Firebase service account credentials are not configured.');
  }

  return JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(readServiceAccount()),
  });
}

export default admin;
