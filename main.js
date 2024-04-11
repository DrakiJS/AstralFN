const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        center: true 
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Fonction pour lancer le fichier batch
function launchBatchFile() {
    const batchFilePath = path.join(__dirname, 'Launcher.bat');
    const child = spawn(batchFilePath, [], { detached: true });
    child.unref(); // Permet à l'application de continuer à s'exécuter indépendamment du processus enfant
}

module.exports = {
    launchBatchFile
};

