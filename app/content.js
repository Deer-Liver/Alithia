// content.js
(() => {
    console.log("Content script is running...");

    // Function to gather content
    const getContent = () => {
        // Find all images on the page
        const images = [...document.getElementsByTagName("img")].map(img => img.src);
        
        // Find all videos on the page
        const videos = [...document.getElementsByTagName("video")].map(video => video.src);

        // Get all visible text on the page
        const text = document.body.innerText.trim();  // This includes everything in the body, avoiding non-visible text
        
        // Find all links
        const links = [...document.getElementsByTagName("a")].map(a => a.href);

        // Return the data to popup.js (which will log it in the console)
        return {
            images: images,
            videos: videos,
            text: text,
            links: links
        };
    };

    // Listen for the message to scan content
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "scanContent") {
            const content = getContent();
            sendResponse(content);  // Send the scanned content back to popup.js
        }
    });
})();
