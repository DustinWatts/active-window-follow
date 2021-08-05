/* This NodeJS app polls the active window using the pollinterval and checks if the current
active window is not already sent and then sends the menu of choice to FreeTouchDeck.

On Windows use "windowClass" to check the application that is running

On macOS use "windowsName" to check the application that is running

Serial port:

install: npm install serialport

Windows -> "com1" etc.
macOS -> "/dev/tty.SLAB_USBtoUART" etc.
Linux -> "/dev/ttyUSB0" etc.

Active Window:

install: npm install https://github.com/nullxx/electron-active-window

TODO:
- GUI

*/

const os = require('os');
const SerialPort = require('serialport');
const port = new SerialPort('/dev/tty.SLAB_USBtoUART', {
  baudRate: 115200,
});
const activeWindows = require('electron-active-window');

var previousactive = '';
var currentactive = '';
let menu;
let pollinterval = 500;

setInterval(getActive, pollinterval);

/*Use this to keep logging the active window to the console so you
  can see what the windowName of WindowClass is. */

//setInterval(whatIsActive, pollinterval);

async function getActive() {
  const result = await activeWindows().getActiveWindow();
  currentactive = result.windowClass; // <- change this depening on your OS.

  // Change this to fit your needs! These are CASE sensitive.
  if (currentactive != previousactive || previousactive === '') {
    previousactive = currentactive;
    if (currentactive === 'Code.exe') {
      menu = 'menu1 ';
    } else if (currentactive === 'Discord') {
      menu = 'menu2 ';
    } else if (currentactive === 'firefox.exe') {
      menu = 'menu3 ';
    } else if (currentactive === 'iTerm2') {
      menu = 'menu4 ';
    } else if (currentactive === 'GitHub Desktop') {
      menu = 'menu5 ';
    } else {
      return;
    }

    await send(menu);
  }
}

async function send(data) {
  port.write(`${data.toString()} `, function (err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log(`Data sent! ${currentactive} -> ${data.toString()}`);
  });
}

port.on('error', function (err) {
  console.log('Error: ', err.message);
});

async function whatIsActive() {
  const activewindow = await activeWindows().getActiveWindow();
  if(os.platform() === "win32"){

    console.log(activewindow.windowClass);

  }
  else if(os.platform() === "darwin"){

    console.log(activewindow.windowName);

  }
  
}

console.log('Active Window Follow started!');




