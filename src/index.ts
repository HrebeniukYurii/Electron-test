// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs/promises');

const SAVE_STRING_ACTION = 'save-string';
const GET_STRING_ACTION = 'get-saved-string';
const SAVING_STRING_FILE_NAME = 'savedString.txt';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(
    path.join(__dirname, '../dist/electron-ui', 'index.html')
  );
}

async function saveStringHandler(event: Event, value: string) {
  await fs.writeFile(path.join(__dirname, SAVING_STRING_FILE_NAME), value);
}

async function getStringHandler() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, SAVING_STRING_FILE_NAME),
      {
        encoding: 'utf8',
      }
    );
    return data;
  } catch (err) {
    return null;
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle(SAVE_STRING_ACTION, saveStringHandler);
  ipcMain.handle(GET_STRING_ACTION, getStringHandler);
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
