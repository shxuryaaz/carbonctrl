# 🚀 CarbonCtrl Deployment Guide

This guide will help you deploy your CarbonCtrl application to production.

## 📋 Prerequisites

- Node.js 18+ installed
- Firebase project created
- Git repository (optional but recommended)

## 🔥 Firebase Deployment (Recommended)

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Project

```bash
firebase init
```

Select the following options:
- ✅ Hosting
- ✅ Firestore
- ✅ Functions (optional)

### Step 4: Configure Firebase Project

When prompted, select your Firebase project: `truthprevails-a590e`

### Step 5: Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

## ⚡ Vercel Deployment (Alternative)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel
```

### Step 4: Set Environment Variables

In your Vercel dashboard, add these environment variables:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyDvH9yX-PKy0MucxhwPDjUO5WyNu1AuW4w
REACT_APP_FIREBASE_AUTH_DOMAIN=truthprevails-a590e.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=truthprevails-a590e
REACT_APP_FIREBASE_STORAGE_BUCKET=truthprevails-a590e.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=478024801357
REACT_APP_FIREBASE_APP_ID=1:478024801357:web:b42fb222d8c9845bbb1004
```

## 🛠️ Quick Deployment Script

Use the provided deployment script:

```bash
./deploy.sh
```

This script will:
1. Install dependencies
2. Build the project
3. Deploy to Firebase
4. Show deployment status

## 🔧 Environment Variables

Make sure these environment variables are set in your deployment platform:

### Required Variables:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

### Your Current Values:
```
REACT_APP_FIREBASE_API_KEY=AIzaSyDvH9yX-PKy0MucxhwPDjUO5WyNu1AuW4w
REACT_APP_FIREBASE_AUTH_DOMAIN=truthprevails-a590e.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=truthprevails-a590e
REACT_APP_FIREBASE_STORAGE_BUCKET=truthprevails-a590e.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=478024801357
REACT_APP_FIREBASE_APP_ID=1:478024801357:web:b42fb222d8c9845bbb1004
```

## 🔐 Firebase Security Rules

The deployment includes Firestore security rules that:
- Allow users to read/write their own data
- Protect sensitive operations
- Enable proper authentication

## 📱 PWA Configuration

The app is configured as a Progressive Web App (PWA) with:
- Service worker for offline functionality
- App manifest for installability
- Responsive design for all devices

## 🌐 Custom Domain (Optional)

### Firebase Hosting:
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps

### Vercel:
1. Go to Vercel Dashboard → Project Settings
2. Add your domain in the "Domains" section
3. Configure DNS records

## 🚨 Troubleshooting

### Build Errors:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase Authentication Issues:
1. Check Firebase Console → Authentication
2. Enable Google sign-in provider
3. Add your domain to authorized domains

### Environment Variables Not Working:
1. Verify variable names start with `REACT_APP_`
2. Redeploy after adding variables
3. Check deployment platform logs

## 📊 Monitoring

### Firebase Analytics:
- Automatically enabled
- View in Firebase Console → Analytics

### Performance:
- Firebase Performance Monitoring
- Vercel Analytics (if using Vercel)

## 🔄 Continuous Deployment

### GitHub Actions (Firebase):
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: truthprevails-a590e
```

## 🎉 Success!

After deployment, your app will be available at:
- **Firebase**: `https://truthprevails-a590e.web.app`
- **Vercel**: `https://your-project.vercel.app`

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Ensure Firebase project is properly configured
4. Check browser console for errors

Happy deploying! 🚀
