/* ===== 背景粒子动画 ===== */
(function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    const COLORS = ['#6c63ff', '#ff6584', '#43e97b', '#f7971e', '#4facfe'];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = Math.floor((W * H) / 18000);
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2.5 + 0.8,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.5 + 0.2,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); createParticles(); });
    resize();
    createParticles();
    draw();
})();


/* ===== 页面入场动画 ===== */
document.addEventListener('DOMContentLoaded', () => {
    // 容器淡入
    const container = document.querySelector('.container');
    requestAnimationFrame(() => {
        setTimeout(() => container.classList.add('visible'), 80);
    });

    // 卡片交错入场（Intersection Observer）
    const cards = document.querySelectorAll('.card, .about-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                setTimeout(() => el.classList.add('visible'), delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
        card.dataset.delay = i * 60;
        observer.observe(card);
    });


    /* ===== 鼠标跟随光晕 ===== */
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 320px; height: 320px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.12s ease-out, top 0.12s ease-out;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });


    /* ===== 控制台彩蛋 ===== */
    console.log(
        "%c Eve's Portfolio %c ✨ Vibe Coding Online ",
        "color: white; background: #6c63ff; padding: 6px 12px; border-radius: 4px 0 0 4px; font-weight: bold;",
        "color: #6c63ff; background: #f0eeff; padding: 6px 12px; border-radius: 0 4px 4px 0;"
    );
});
