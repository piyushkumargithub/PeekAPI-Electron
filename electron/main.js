const { app, BrowserWindow } = require("electron");
const path = require("path");

// Enable hot reload in development
if (process.env.NODE_ENV === "development") {
  require("electron-reload")(path.join(__dirname, "../frontend"), {
    electron: path.join(__dirname, "../node_modules/.bin/electron"),
    ignored: /node_modules|[/\\]\./, // Ignore unnecessary files
  });
}

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = !app.isPackaged; // Check if running in dev mode

  const startUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../frontend", "build", "index.html")}`;

  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
