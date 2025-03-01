document.addEventListener('DOMContentLoaded', function () {
    const scanButton = document.getElementById('scanButton');
    const scanResults = document.getElementById('scanResults');

    // Button click event to trigger scanning
    scanButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: scanContent
            }, (results) => {
                if (results && results[0] && results[0].result) {
                    scanResults.innerHTML = `
                        <p>Found ${results[0].result.images} images, ${results[0].result.videos} videos, and extracted text from posts.</p>
                    `;
                } else {
                    scanResults.innerHTML = '<p>No content found.</p>';
                }
            });
        });
    });
});

// This function runs inside the webpage when triggered
function scanContent() {
    const images = document.querySelectorAll('img').length;
    const videos = document.querySelectorAll('video').length;
    const text = document.body.innerText.substring(0, 1000); // Limiting text preview

    return { images, videos, text };
}
