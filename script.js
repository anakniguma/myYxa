document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const messageTexts = document.querySelectorAll('.message-text');
    const confession = document.querySelector('.confession');
    const particlesContainer = document.getElementById('particles-container');

    // Create background star particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 4 + 3;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
    }

    let isOpen = false;

    envelopeWrapper.addEventListener('click', function () {
        if (isOpen) return;
        isOpen = true;
        envelopeWrapper.classList.add('open');

        // Play background music using a local file
        var bgMusic = new Audio('music.mp3');
        bgMusic.loop = true;
        bgMusic.play().catch(function(error) {
            console.log("Audio autoplay failed:", error);
        });

        // Sequence text animations
        var currentDelay = 1600;

        messageTexts.forEach(function (text) {
            setTimeout(function () {
                text.classList.add('visible');
            }, currentDelay);
            currentDelay += 2000;
        });

        setTimeout(function () {
            confession.classList.add('visible');
            createHeartParticles();
        }, currentDelay + 500);
    });

    function createHeartParticles() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = Math.random() > 0.5 ? '💙' : '💚';
            heart.style.position = 'absolute';
            heart.style.fontSize = `${Math.random() * 15 + 10}px`;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 20;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            heart.style.left = `calc(50% + ${x}px)`;
            heart.style.top = `calc(50% - 100px + ${y}px)`;
            heart.style.opacity = '0';
            heart.style.transform = `translate(0, 0) scale(0.5)`;
            heart.style.transition = 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            heart.style.zIndex = '100';
            heart.style.pointerEvents = 'none';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.opacity = '0.8';
                const moveX = Math.cos(angle) * (distance + 100);
                const moveY = Math.sin(angle) * (distance + 150) - 100;
                heart.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.random() + 0.8})`;
            }, 50);

            setTimeout(() => {
                heart.style.opacity = '0';
                heart.style.transition = 'opacity 1s ease';
            }, 1500);

            setTimeout(() => {
                heart.remove();
            }, 2600);
        }
    }
});
