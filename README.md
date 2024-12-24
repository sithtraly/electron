# Gasoline Station

This application build using [Electrinjs](https://www.electronjs.org/), [Angularjs](https://angularjs.org/) and using [Sqlite](https://www.sqlite.org/) database. using [VsCode](https://code.visualstudio.com/) as text editor.

## 1. Install project

```bash
npm install
```

## 2. Run project

```bash
npm start
```

## 3. Build exe file

```bash
npm run make
```

after build exe file will generate in **/project-path/out/make/squirrel.windows/x64/setup.exe** this is installer but don't have any proccess like choose path and other install, just run and install, and a portable in **/project-path/out/make/Gasoline Station-win32-x64/Gasoline Station.exe** that allow to use without install

if you wish to get installer you can use external tool like [Inno](https://jrsoftware.org/isinfo.php) by do the following step:

1. Dowload and install [Inno](https://jrsoftware.org/isdl.php)
1. Open Inno => Click on file => **New (Ctrl+N)**
1. Welcome to the Inno Scipt Wizard => **Next**
1. Application Information
    - Application Name: Enter your application name: **Gasoline Station**
    - Application Version: Enter your application version: **1.0.0**
    - Application Publisher: Enter your name or company name: **Traly**
    - Application Webiste: remove text from textbox => **Next**
1. Application Folder
    - Application destination base folder: **Program File Folder**
    - Application folder name: **Gasoline Station** => **Next**
1. Application Files
    - Application main executable file: browser to **/project-path/out/make/Gasoline Station-win32-x64/Gasoline Station.exe**
    - Other application files => **Add file(s)...** => select file **/project-path/out/make/Gasoline Station-win32-x64/ffmpeg.dll** => **Next**
1. Application File Association
    - Application file type name: **Gasoline Station File**
    - Application file extension: **.gas** => **Next**
1. Application Shortcuts => **Next**
1. Application Documentation => **Next**
1. Setup Install Mode
    - **Non administative install mode (insall for current user only)** => **Next**
1. Application Registy Keys And Values **Next**
1. Select Languages
    - **English** => **Next**
1. Compiler Settings
    - Customer compiler output folder: any folder you want
    - Compiler output base file name: **Setup.exe**
    - Custom Setup icon file: leave blank or browse to **project-path/src/favicon.ico** => **Next**
1. Inno Setup Proccessor => **Next**
1. **Finish**
    - **Yes** to save you config script for easy build next time
    - **No** to build setup now
1. Click **Run**(F9) and wait until build finish
