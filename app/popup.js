// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the elements in the popup
    const scanButton = document.getElementById('scanButton');
    const scanResults = document.getElementById('scanResults');

    // Handle button click to trigger scanning
    scanButton.addEventListener('click', function () {
        // Send a message to the content script to start scanning
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];

            // Send a message to the content script in the current tab
            chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                function: scanContent, // scanContent is the function that will run in the page
            }, (results) => {
                // Handle the results and display them in the popup
                if (results && results[0]) {
                    scanResults.innerHTML = `<p>Found ${results[0].result.length} items</p>`;
                } else {
                    scanResults.innerHTML = '<p>No results found.</p>';
                }
            });
        });
    });
});

// Function to scan the page content
function scanContent() {
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video');
    const text = document.body.innerText;

    const content = {
        images: images.length,
        videos: videos.length,
        textLength: text.length,
    };

    // Return the result to popup.js
    return content;
}
