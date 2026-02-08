# Automatic Deployment Setup for Hostinger

This project is configured with automatic frontend build and deployment to Hostinger via Git.

## How It Works

When you commit your changes locally, a Git pre-commit hook automatically:

1. ✅ Builds the frontend (`npm run build` in the frontend directory)
2. ✅ Copies all build files to `backend/public/` directory
3. ✅ Adds the updated files to your commit
4. ✅ Allows the commit to proceed

After committing, simply push to your Hostinger Git repository:

```bash
git push origin main
```

## Setup Verification

The pre-commit hook is located at `.git/hooks/pre-commit` and is automatically executed by Git.

## Manual Build (if needed)

If you need to build and copy manually without committing:

```bash
cd frontend
npm run build
```

Then copy the `frontend/build/*` files to `backend/public/` directory.

## Troubleshooting

### Hook not executing
- Make sure you're using Git Bash or have Git properly configured on Windows
- The hook file should have Unix line endings (LF, not CRLF)
- Check that the hook file is executable

### Build fails
- Ensure Node.js and npm are installed
- Run `npm install` in the frontend directory
- Check for any errors in the frontend code

### Files not copying
- Check that the `backend/public/` directory exists
- Ensure you have write permissions to the directory

## Important Notes

- The Laravel `index.php` and `.htaccess` files in `backend/public/` are preserved during the copy process
- The build process must complete successfully or the commit will be aborted
- All frontend build files are automatically tracked in Git and will be deployed to Hostinger
