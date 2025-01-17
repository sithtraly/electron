const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

module.exports = function () {
  // Auto-update check
  // autoUpdater.setFeedURL({
  //   url: 'https://github.com/sithtraly/electron.git',
  // })

  autoUpdater.checkForUpdates();

  // Handle update events
  autoUpdater.on("update-available", () => {
    dialog.showMessageBox({
      type: "info",
      title: "Update Available",
      message: "A new update is available. It will be downloaded in the background.",
    });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update Ready",
        message: "Update downloaded. The app will restart to apply the update.",
      })
      .then(() => {
        autoUpdater.quitAndInstall();
      });
  });

  autoUpdater.on("error", (err) => {
    console.error("Update Error:", err);
  });
}