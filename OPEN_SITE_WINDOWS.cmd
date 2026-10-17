@echo off
cd /d "%~dp0"

if not exist "index.html" (
  echo.
  echo SITE FILES NOT FOUND.
  echo.
  echo IMPORTANT:
  echo 1. Right-click the ZIP.
  echo 2. Select "Extract All..."
  echo 3. Open the extracted folder.
  echo 4. Run OPEN_SITE_WINDOWS.cmd from that folder.
  echo.
  pause
  exit /b
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0START_LOCAL_SERVER.ps1"
