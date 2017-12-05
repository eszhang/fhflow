@echo off
REM registry compass path
compass -v
if errorlevel 1 (
    setx path "%path%;%1/Ruby22/bin/;"
    if errorlevel 1 (echo "i-error") else (echo "i-success")
)else (
    echo "i-success"
)
exit