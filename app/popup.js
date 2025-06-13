document.addEventListener('DOMContentLoaded', function () {
    const scanButton = document.getElementById('scanButton');
    const scanResults = document.getElementById('scanResults');

    scanButton.addEventListener('click', function () {
        scanResults.innerHTML = '<p>Processing...</p>'; // Show status update

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: scanContent
            }, (results) => {
                if (results && results[0] && results[0].result) {
                    const { images, text } = results[0].result;

                    scanResults.innerHTML = '<p>Sending to AI...</p>'; // Update UI status

                    fetchOpenAIResponse(images, text)
                        .then(response => {
                            scanResults.innerHTML = `<p>${response}</p>`; // Show final result
                        })
                        .catch(error => {
                            console.error("Error:", error);
                            scanResults.innerHTML = '<p>Error processing content.</p>';
                        });
                } else {
                    scanResults.innerHTML = '<p>No content found.</p>';
                    console.log("No content found.");
                }
            });
        });
    });
});

// Function to extract images and text from the page
function scanContent() {
    const images = document.querySelectorAll('img').length;
    const text = document.body.innerText.substring(0, 1000); // Limit to 1000 characters
    return { images, text };
}

// Function to send data to OpenAI API with error detection
async function fetchOpenAIResponse(images, text) {
    const SERVER_URL = "http://192.168.1.178:3000/analyze"; // Talk to server that talks to open ai (for security)

    try {
        const response = await fetch(SERVER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ images, text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Server error");
        }

        return data.warning;
    } catch (error) {
        console.error("Error contacting server:", error);
        throw new Error("Could not get warning from server.");
    }
}

