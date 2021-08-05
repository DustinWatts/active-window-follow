# Active Window Follow for FreeTouchDeck
NodeJS app that polls the active window and sends it to your FreeTouchDeck. Note: only usable with version ^0.9.14
of FreeTouchDeck.

# Installation

Prerequisites:
 - npm for installing packages
 - Node.js for running the application

Install using:
`npm install`

# Usage

Select the right COM port depending on your OS:

```
const port = new SerialPort('/dev/tty.SLAB_USBtoUART', {
  baudRate: 115200,
});
```

use `setInterval(whatIsActive, pollinterval);` to console log the active window so you can see what the window name or class is called.

on Windows use windowClass as the active application and on macOS use windowName:

`currentactive = result.windowClass;` or `currentactive = result.windowName`

In the if statement you can check what the current active window is:

```
// Change this to fit your needs! These are CASE sensitive.
  if (currentactive != previousactive || previousactive === '') {
    previousactive = currentactive;
    if (currentactive === 'Code.exe') {
      menu = 'menu1 ';
    } else if (currentactive === 'discord.exe') {
      menu = 'menu2 ';
    } else if (currentactive === 'firefox.exe') {
      menu = 'menu3 ';
    } else if (currentactive === 'explorer.exe') {
      menu = 'menu4 ';
    } else if (currentactive === 'chrome.exe') {
      menu = 'menu5 ';
    } else {
      return;
    }
```


