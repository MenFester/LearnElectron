let { BrowserWindow } = require('electron');

exports.makeWin = function() {
    let win = new BrowserWindow({
        webPreferences: { nodeIntegration: true }
    });
    return win;
}