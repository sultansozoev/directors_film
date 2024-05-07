const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  return win;
}

app.on('ready', () => {
  win = createWindow();
});
