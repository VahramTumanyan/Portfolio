@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py preview_server.py
) else (
  python preview_server.py
)
pause
