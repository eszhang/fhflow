@echo off
REM registry nodejs path
node -v
if errorlevel 1 (
    setx path "%path%;%1/nodejs/;"
    if errorlevel 1 (echo "i-error") else (echo "i-success")
)else (
    echo "i-success"
)
exit
