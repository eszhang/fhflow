@echo off
REM registry compass path
where compass
if errorlevel 1 (
    setx path "%path%;%1\ruby\bin/;"
    if errorlevel 1 (echo "i-error") else (echo "i-success")
)else (
    echo "i-success"
)
exit