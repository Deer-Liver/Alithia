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
    const apiKey = "API_KEY"; //Insert your API here
    const prompt = `Analyze the following post content and generate a one-sentence warning about potential consequences. Examples include "Warning: posting this may result in a minimum of 4 weeks detention" or "Warning: posting this may lead to an increase in engagement."

    Images detected: ${images}
    Extracted text: "${text}"`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 50
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${data.error.message}`);
        }

        console.log("OpenAI response:", data);  // Log the full response for debugging
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error during OpenAI request:", error);
        throw new Error("There was an issue processing the content. Please try again.");
    }
}
