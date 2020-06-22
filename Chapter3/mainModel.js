let { BrowserWindow } = require('electron');

exports.makeWin = function() {
    let win = new BrowserWindow({
        webPreferences: { nodeIntegration: true, enableRemoteModule: true }
    });
    return win;
}