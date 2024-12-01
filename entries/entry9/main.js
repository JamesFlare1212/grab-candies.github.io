function falling() {
    // Define array of icons or use custom images
    let icons = [
        "./imgs/1.png",
        "./imgs/2.png",
        "./imgs/3.png",
        "./imgs/4.png",
        "./imgs/5.png",
        "./imgs/6.png",
    ];

    // Create container
    let item = document.createElement("div");
    let icon = document.createElement("img");
    icon.src = icons[Math.floor(Math.random() * icons.length)];

    // Append image to container
    item.appendChild(icon);
    item.classList.add("item");

    // Randomize size and position
    let size = Math.random() * 40 + 200; // 20px - 60px 图片大小
    icon.style.width = `${size}px`;
    item.style.left = `${Math.random() * 100}vw`;

    document.body.appendChild(item);

    // Remove after animation
    setTimeout(() => {
        document.body.removeChild(item);
    }, 10000); // 动画时长对应 CSS 中的 5s
}

// Generate a falling item every 300ms
setInterval(falling, 600);
