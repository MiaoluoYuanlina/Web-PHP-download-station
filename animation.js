
const colors = ['#43CDFF', '#FDFF42', '#42FFFD', '#84FF43', '#A242FF', '#FF4284', '#42FFA9', '#A242FF', '#A242FF']; // 定义颜色数组

// 监听视频背景点击事件
const videoBackground = document.getElementById('video-background');
videoBackground.addEventListener('click', function(event) {
    // 获取点击位置相对于视口的坐标
    const x = event.clientX;
    const y = event.clientY;

    // 创建星星效果
    createStars(x, y);
});

// 监听整个文档的点击事件
const container = document.querySelector('.container');
document.addEventListener('click', function(event) {
    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;
    createStars(x, y);
});

// 创建星星
function createStars(x, y) {
    const numStars = 30;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.backgroundColor = getRandomColor(); // 随机选择颜色
        document.body.appendChild(star); // 将星星添加到 body 元素中
        animateStar(star);
    }
}

// 获取随机颜色
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// 动画效果：星星向四周散开并淡出
function animateStar(star) {
    const speed = Math.random() * 3 + 1; // 随机速度
    const angle = Math.random() * Math.PI * 2; // 随机角度

    const deltaX = Math.cos(angle) * speed;
    const deltaY = Math.sin(angle) * speed;

    const opacityChange = 1 / 100; // 透明度变化量
    let opacity = 1; // 初始透明度

    const timer = setInterval(function() {
        const left = parseFloat(star.style.left);
        const top = parseFloat(star.style.top);

        star.style.left = left + deltaX + 'px';
        star.style.top = top + deltaY + 'px';

        opacity -= opacityChange;
        star.style.opacity = opacity;

        // 当透明度为0时移除星星元素
        if (opacity <= 0) {
            clearInterval(timer);
            star.remove();
        }
    }, 20);
}
