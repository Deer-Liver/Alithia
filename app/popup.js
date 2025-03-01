// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const scanButton = document.getElementById('scanButton');
    
    // When the scan button is clicked
    scanButton.addEventListener('click', function() {
        // Send message to content.js to start scanning
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "scanContent" }, function(response) {
                if (response) {
                    console.log("Scanned content from the page:");

                    // Log images to the console
                    console.log("Images:", response.images);
                    
                    // Log videos to the console
                    console.log("Videos:", response.videos);
                    
                    // Log text to the console
                    console.log("Text:", response.text);
                    
                    // Log links to the console
                    console.log("Links:", response.links);
                } else {
                    console.log("No content found.");
                }
            });
        });
    });
});
