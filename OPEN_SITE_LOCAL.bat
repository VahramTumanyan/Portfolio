@echo off
setlocal
cd /d "%~dp0"

if not exist "index.html" (
  echo.
  echo ============================================================
  echo   VAHRAM PORTFOLIO - FILES ARE NOT EXTRACTED
  echo ============================================================
  echo.
  echo You opened OPEN_SITE_LOCAL.bat directly from inside the ZIP.
  echo Windows copied only this BAT file to a temporary folder,
  echo so the web server can see only this one file.
  echo.
  echo PLEASE:
  echo 1. Close this window.
  echo 2. Right-click the ZIP file.
  echo 3. Choose "Extract All..." / "Izvlech vse..."
  echo 4. Open the extracted folder.
  echo 5. Double-click OPEN_SITE_LOCAL.bat there.
  echo.
  pause
  exit /b
)

echo.
echo VAHRAM PORTFOLIO - CLEAN FLY PREVIEW V5
echo Opening local preview on port 8015...
echo Keep this window open while testing.
echo.

where py >nul 2>nul
if %errorlevel%==0 (
    start "" "http://localhost:8015/index.html?v=5"
    py -m http.server 8015
    goto :eof
)

where python >nul 2>nul
if %errorlevel%==0 (
    start "" "http://localhost:8015/index.html?v=5"
    python -m http.server 8015
    goto :eof
)

echo Python was not found on this computer.
echo Install Python, then run this file again.
echo.
pause
