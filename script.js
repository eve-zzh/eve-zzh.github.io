document.addEventListener('DOMContentLoaded', () => {
    // 1. 实现内容淡入效果 (Fade-in effect)
    // PM 视角：通过进场动画，建立页面加载的仪式感
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
    container.style.transform = 'translateY(10px)';

    // 稍微延迟一下触发，确保浏览器已经准备好
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);

    // 2. 链接悬停的微交互
    // PM 视角：增强用户在交互时的“反馈感知”
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // 鼠标移入时，让其他的模块稍微变淡，突出当前选中的
            navLinks.forEach(other => {
                if (other !== link) other.style.opacity = '0.3';
            });
        });

        link.addEventListener('mouseleave', () => {
            // 鼠标移出，恢复原样
            navLinks.forEach(other => {
                other.style.opacity = '1';
            });
        });
    });

    // 3. 打印一份控制台简历说明 (彩蛋)
    // PM 视角：给懂技术的面试官留个好印象
    console.log(
        "%c Eve's Portfolio %c System Status: Online ",
        "color: white; background: black; padding: 5px 10px; border-radius: 3px 0 0 3px;",
        "color: black; background: #eee; padding: 5px 10px; border-radius: 0 3px 3px 0;"
    );
});
