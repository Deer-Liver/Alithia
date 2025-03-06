chrome.runtime.onInstalled.addListener(() => {
    console.log("Consequence Eradicator Extension Installed or Updated.");
});

chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked on tab:", tab);
});

