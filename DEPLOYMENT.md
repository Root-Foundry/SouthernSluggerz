# Firebase Hosting Deployment Guide

## Prerequisites
1. Install Node.js (if not already installed): https://nodejs.org/
2. Install Firebase CLI globally:
   ```powershell
   npm install -g firebase-tools
   ```

## Initial Setup

### 1. Login to Firebase
```powershell
firebase login
```
This will open a browser for you to authenticate with your Google account.

### 2. Create or Select Firebase Project
- Go to https://console.firebase.google.com/
- Create a new project (or select an existing one)
- Name it something like "southern-sluggerz" or "southern-sluggerz-7u"
- Copy the Project ID from the Firebase Console

### 3. Initialize Firebase in Your Project
```powershell
cd F:\SouthernSluggerz
firebase init hosting
```

When prompted:
- Select your Firebase project from the list (or use the Project ID you copied)
- **What do you want to use as your public directory?** Type: `.` (current directory)
- **Configure as a single-page app?** Type: `No`
- **Set up automatic builds?** Type: `No`
- **File .firebaserc already exists. Overwrite?** Type: `No`
- **File firebase.json already exists. Overwrite?** Type: `No`

### 4. Update .firebaserc with Your Project ID
Edit `.firebaserc` and replace `your-firebase-project-id` with your actual Firebase Project ID:
```json
{
  "projects": {
    "default": "southern-sluggerz"
  }
}
```

## Deployment

### Deploy to Firebase Hosting
```powershell
firebase deploy --only hosting
```

After deployment, Firebase will provide you with a hosting URL like:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

## Custom Domain Setup (southernsluggerz.com)

### 1. Add Custom Domain in Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select your project
3. Go to **Hosting** in the left sidebar
4. Click **Add custom domain**
5. Enter: `southernsluggerz.com`
6. Follow the verification steps

### 2. Update DNS Records
Firebase will provide you with DNS records to add to your domain registrar:

**A Records (for root domain):**
```
Type: A
Name: @
Value: (IP addresses provided by Firebase)
```

**TXT Record (for verification):**
```
Type: TXT
Name: @
Value: (verification code provided by Firebase)
```

**Add www subdomain (optional):**
```
Type: CNAME
Name: www
Value: southernsluggerz.com
```

### 3. Wait for Propagation
- DNS changes can take up to 48 hours to propagate
- Firebase will automatically provision SSL certificate once DNS is verified
- You'll get HTTPS automatically

## Common Commands

### Deploy your site:
```powershell
firebase deploy --only hosting
```

### View your site locally before deploying:
```powershell
firebase serve
```
Then open: http://localhost:5000

### Check hosting status:
```powershell
firebase hosting:channel:list
```

### View deployment history:
Go to Firebase Console > Hosting > Dashboard

## Sitemap Update
After your custom domain is live, verify that your sitemap.xml has the correct domain:
- It's already configured for `https://southernsluggerz.com/`

## Continuous Deployment (Optional)
You can set up GitHub Actions to automatically deploy when you push to main:

1. Generate a Firebase token:
   ```powershell
   firebase login:ci
   ```
2. Add the token as a GitHub secret named `FIREBASE_TOKEN`
3. Create `.github/workflows/firebase-hosting.yml` (let me know if you want help with this)

## Troubleshooting

### If deployment fails:
1. Ensure you're logged in: `firebase login`
2. Check your project ID in `.firebaserc`
3. Verify you have hosting enabled in Firebase Console

### If custom domain doesn't work:
1. Verify DNS records in your domain registrar
2. Check Firebase Console > Hosting for verification status
3. Wait for DNS propagation (can take 24-48 hours)

## Support
- Firebase Documentation: https://firebase.google.com/docs/hosting
- Firebase Console: https://console.firebase.google.com/
