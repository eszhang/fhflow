@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"%~dp0/ruby.exe" "%~dp0/sass" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
@"%~dp0/ruby.exe" "%~dpn0" %*
