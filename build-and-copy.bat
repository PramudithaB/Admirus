@echo off
REM Manual build script for Windows
REM This script builds the frontend and copies files to backend/public

echo Building frontend...

cd frontend
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    cd ..
    pause
    exit /b 1
)

echo Build successful!
echo.
echo Copying files to backend/public...

cd ..\backend\public

REM Remove old build files (keep Laravel files and images)
for /d %%i in (*) do (
    if /i not "%%i"=="storage" rd /s /q "%%i"
)
for %%i in (*) do (
    if /i not "%%i"=="index.php" if /i not "%%i"==".htaccess" if /i not "%%~xi"==".jpeg" if /i not "%%~xi"==".jpg" if /i not "%%~xi"==".png" del /q "%%i"
)

REM Copy new files
xcopy /E /I /Y ..\..\frontend\build\* .

echo.
echo Files copied successfully!
echo.
echo You can now commit and push your changes.
cd ..\..
pause
