<<<<<<< HEAD
# Expense_Frontend
Develped the Front end For Expense Tracker Project
=======
# Expense Tracker Frontend

React, TypeScript, Vite, Redux Toolkit, Firebase Authentication, and Tailwind CSS frontend for the Expense Tracker app.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

3. Fill in the Firebase values and backend API URL in `.env`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Production Notes

- `.env`, `node_modules`, `dist`, and TypeScript build info are ignored by git.
- Set `VITE_API_URL` to the deployed backend API before building for production.
- Firebase browser config is loaded from Vite environment variables.
>>>>>>> aa0189b (Prepare frontend for production)
