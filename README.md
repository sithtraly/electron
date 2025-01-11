# Tele Khmer

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

after build exe file will generate in **/project-path/out/make/squirrel.windows/x64/setup.exe** this is installer but don't have any proccess like choose path and other install, just run and install, and a portable in **/project-path/out/make/Tele Khmer-win32-x64/Tele Khmer.exe** that allow to use without install

if you wish to get installer you can use external tool like [Inno](https://jrsoftware.org/isinfo.php) by do the following step:

1. Dowload and install [Inno](https://jrsoftware.org/isdl.php)
1. Open Inno => Click on file => **New (Ctrl+N)**
1. Welcome to the Inno Scipt Wizard => **Next**
1. Application Information
    - Application Name: Enter your application name: **Tele Khmer**
    - Application Version: Enter your application version: **1.0.0**
    - Application Publisher: Enter your name or company name: **Traly**
    - Application Webiste: remove text from textbox => **Next**
1. Application Folder
    - Application destination base folder: **Program File Folder**
    - Application folder name: **Tele Khmer** => **Next**
1. Application Files
    - Application main executable file: browser to **/project-path/out/make/Tele Khmer-win32-x64/Tele Khmer.exe**
    - Other application files => **Add file(s)...** => select file **/project-path/out/make/Tele Khmer-win32-x64/ffmpeg.dll** => **Next**
1. Application File Association
    - Application file type name: **Tele Khmer File**
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

## 4. Generate certificate

- **Generate crt and key file**

```bash
openssl req -new -newkey rsa:2048 -nodes -keyout private.key -x509 -days <365> -out certificate.crt
```

This command will create two file is: **certificate.crt** and **private.key**

- **Generate pfx file**

```bash
openssl pkcs12 -export -out certificate.pfx -inkey private.key -in certificate.crt
```

## 5. Sign certificate

Application need cerificate to prevent trojan and virus detection from windows defender or other antivirus software. normally this certificate will automatically by configuration in [**forge.config.js**](./forge.config.js), but you still can sign it manually by run below command your root folder of project:

```bash
node_modules\electron-winstaller\vendor\signtool.exe sign /a /f certificate.pfx /p "123" out\make\squirrel.windows\x64\Setup.exe
```
