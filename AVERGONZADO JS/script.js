function changeColor() {
    const box = document.getElementById("box");
    const colors = ["crimson", "darkorange", "forestgreen", "dodgerblue", "purple", "gold"];
    box.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

function increaseSize() {
    const box = document.getElementById("box");
    let currentSize = box.offsetWidth;
    let newSize = currentSize + 20;
    box.style.width = newSize + "px";
    box.style.height = newSize + "px";
}

function rotateBox() {
    rotation += 45;
    document.getElementById("box").style.transform = `rotate(${rotation}deg)`;
}

function resetBox() {
    const box = document.getElementById("box");
    rotation = 0;
    box.style.transform = "rotate(0deg)";
    box.style.width = "200px";
    box.style.height = "200px";
    box.style.backgroundColor = "steelblue";
}
