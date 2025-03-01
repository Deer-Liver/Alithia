// This is where you can handle background tasks like event listeners or performing periodic actions.

// Example: Listen for the extension being installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("Consequence Eradicator Extension Installed or Updated.");
});

// Example: Listen for browser action clicks (optional)
chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked on tab:", tab);
});
