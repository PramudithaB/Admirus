# GitIgnore Configuration

## Files Updated

### 1. Root `.gitignore` (NEW)
Added project-wide ignore patterns:
- Operating system files (Windows, Mac, Linux)
- IDE/Editor files (.vscode, .idea, etc.)
- Common log and temp files
- Local environment variables

### 2. `frontend/.gitignore`
**Important Change:** Removed `/build` from ignore list
- ✅ Build files are now tracked in Git
- ✅ Build files will be committed and deployed
- This is necessary because the pre-commit hook copies build files to `backend/public/`

### 3. `backend/.gitignore`
Enhanced with Laravel best practices:
- IDE helper files (`_ide_helper*.php`)
- Composer artifacts
- Storage logs
- Testing files
- Environment files (.env, .env.backup, .env.testing)

## What Gets Committed

### ✅ Tracked (Committed to Git):
- `frontend/build/*` - React production build files
- `backend/public/*` - Public assets including frontend build
- `backend/app/*` - Laravel application code
- `backend/config/*` - Configuration files
- `backend/routes/*` - Route definitions
- `composer.json` and `package.json`

### ❌ Ignored (NOT Committed):
- `.env` files (environment variables)
- `node_modules/` (dependencies)
- `vendor/` (Composer dependencies)
- IDE configuration files
- Log files
- Operating system files

## Deployment Flow

```
Local Commit → Pre-commit Hook → Frontend Build → Copy to backend/public → Git Commit → Push → Hostinger
```

All necessary files including the frontend build are now automatically tracked and deployed!

## Verify What's Tracked

Check which files are tracked:
```bash
git status
```

Check if build files are tracked:
```bash
git ls-files frontend/build/
git ls-files backend/public/
```

If you need to add files that were previously ignored:
```bash
git add -f path/to/file
```
