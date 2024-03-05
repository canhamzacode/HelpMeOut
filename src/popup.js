document.addEventListener("DOMContentLoaded", function () {
  chrome.windows.getAll((windows) => {
    console.log(windows);
    const popupWindowId =
      windows.find((window) => window.type === "popup")?.id || null;

    // Add event listener to close button
    let closeExtension = document.getElementById("close-extension");
    closeExtension.addEventListener("click", () => {
      // Close the popup window using its ID
      chrome.windows.remove(popupWindowId);
    });
  });
  // chrome.tabs.query
});
