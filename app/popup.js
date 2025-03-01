document.getElementById("scanButton").addEventListener("click", async () => {
    // Get the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
        // Send a message to content.js to analyze the page
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
    } else {
        alert("No active tab found!");
    }
});
