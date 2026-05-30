# Expense Tracker Frontend

React, TypeScript, Vite, Redux Toolkit, Firebase Authentication, React Query, Recharts, and Tailwind CSS frontend for the Expense Tracker project.

## Project Requirements

- Node.js 18 or newer
- npm
- Running backend API
- Firebase project with Authentication enabled
- Firebase Email/Password provider enabled
- Firebase Google provider enabled, if Google login is used

## Project Setup

Install dependencies from the frontend folder:

```bash
cd Frontend
npm install
```

Create a `.env` file in `Frontend`:

```env
VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

`VITE_API_URL` should be the backend base URL without `/api`. The app adds `/api` automatically.

## Running Locally

Start the backend first, then run the frontend:

```bash
npm run dev
```

The Vite dev server normally runs at:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Runs TypeScript checks and creates the production build in `dist`.

```bash
npm run preview
```

Serves the production build locally for testing.

```bash
npm run lint
```

Runs ESLint checks.

## Authentication Flow

1. The user signs in or signs up with Firebase Authentication.
2. Firebase returns an ID token to the frontend.
3. The frontend sends that token to the backend `/api/auth/login`.
4. The backend verifies the Firebase token with Firebase Admin.
5. The backend creates or updates the MongoDB user.
6. The backend sets an HTTP-only JWT cookie.
7. Protected API calls use that cookie with `withCredentials: true`.

## Deployment

For Vercel, set these frontend environment variables:

```env
VITE_API_URL=https://your-render-service.onrender.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

In Firebase Authentication authorized domains, add the frontend domain, for example:

```text
your-vercel-app.vercel.app
```

The Render backend URL does not usually need to be added to Firebase authorized domains because Firebase login runs in the browser on the frontend domain.

## Notes

- Shared UI text lives in `src/en.json`.
- Shared UI primitives live in `src/components/ui`.
- Login and signup routes render `LoginForm` and `SignupForm` directly.
- Dashboard contains both summary cards and report charts.
- The mobile dashboard menu is available from the navbar.
