# Expense Tracker - Firebase Authentication Setup

## Setting up Google and GitHub Authentication

### 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:
   - Go to **Authentication** → **Get started**
   - Go to **Sign-in method** tab
   - Enable **Email/Password** provider
   - Enable **Google** provider
   - Enable **GitHub** provider

### 2. Google Provider Setup

1. In Firebase Console → Authentication → Sign-in method
2. Click on **Google** provider
3. Click **Enable**
4. Add your project name and support email
5. Copy the **Client ID** and **Client Secret** (you'll need these later)

### 3. GitHub Provider Setup

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:5173` (for development)
   - **Authorization callback URL**: `https://your-project.firebaseapp.com/__/auth/handler`
4. Create the OAuth App
5. Copy the **Client ID** and **Client Secret**

### 4. Configure Firebase Config

Update `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
  projectId: 'YOUR_FIREBASE_PROJECT_ID',
  appId: 'YOUR_FIREBASE_APP_ID',
};
```

### 5. Add OAuth Redirect URIs

In Firebase Console → Authentication → Settings → Authorized domains:

- Add your production domain
- For development: `localhost`

### 6. Environment Variables (Optional)

You can also use environment variables for sensitive config:

```bash
# .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then update `firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

### 7. Test the Authentication

1. Run `npm run dev`
2. Go to `/login` or `/signup`
3. Try signing in with Google or GitHub
4. Check browser console for any errors

### Troubleshooting

**Common Issues:**

1. **"Auth domain not authorized"**
   - Add your domain to Authorized domains in Firebase Console

2. **"Invalid OAuth access token"**
   - Check your GitHub OAuth App settings
   - Ensure callback URL matches Firebase auth handler

3. **"Popup blocked"**
   - Allow popups for your development domain
   - Some browsers block popups by default

4. **CORS errors**
   - Firebase handles CORS automatically
   - If issues persist, check Firebase project settings

### Security Notes

- Never commit Firebase config keys to version control
- Use environment variables for production deployments
- Regularly rotate OAuth secrets
- Enable Firebase Security Rules for database access

### Next Steps

After authentication is working:

1. Add user profile management
2. Implement logout functionality
3. Add user data persistence
4. Set up protected routes
5. Add user onboarding flow
