(() => {  // Self-invoking function to avoid redeclaration
    console.log("Content script running...");

    const posts = document.querySelectorAll("article, .post, .content, section");

    let images = [];
    let videos = [];
    let text = "";

    posts.forEach(post => {
        images.push(...Array.from(post.getElementsByTagName("img")).map(img => img.src));
        videos.push(...Array.from(post.getElementsByTagName("video")).map(video => video.src));
        text += post.innerText.trim() + "\n\n";
    });

    console.log("Found images:", images);
    console.log("Found videos:", videos);
    console.log("Extracted text:", text.substring(0, 500) + "...");

    alert(`Found ${images.length} images, ${videos.length} videos, and extracted text from posts!`);
})();
