console.log("Content script running...");

// Find all images and videos on the page
const images = [...document.images].map(img => img.src);
const videos = [...document.querySelectorAll("video")].map(video => video.src);

// Get all visible text from the page
const text = document.body.innerText.trim();

console.log("Found images:", images);
console.log("Found videos:", videos);
console.log("Extracted text:", text.substring(0, 500) + "..."); // Show first 500 chars for testing

// Show an alert with a summary
alert(`Found ${images.length} images, ${videos.length} videos, and extracted text!`);
