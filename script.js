// Slide navbar into view on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.nav_hero');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ================= READ MORE TOGGLE =================
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isVisible = content.style.display === 'block';
        content.style.display = isVisible ? 'none' : 'block';
        button.textContent = isVisible ? 'Read More' : 'Read Less';
    });
    
});

// ================= SMOOTH CAROUSEL WITH PAUSE & SMOOTH ARROWS =================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

document.querySelectorAll('.image-slider').forEach(slider => {
    const track = slider.querySelector('.slider-track');

    // Duplicate images for infinite scroll
    track.innerHTML += track.innerHTML;

    let pos = 0;
    const speed = 1;
    let isPaused = false;

    // Pause on hover
    slider.addEventListener('mouseenter', () => isPaused = true);
    slider.addEventListener('mouseleave', () => isPaused = false);

    // Add navigation arrows
    const leftArrow = document.createElement('button');
    leftArrow.className = 'slider-arrow left';
    leftArrow.innerHTML = '&#8249;';
    const rightArrow = document.createElement('button');
    rightArrow.className = 'slider-arrow right';
    rightArrow.innerHTML = '&#8250;';
    slider.appendChild(leftArrow);
    slider.appendChild(rightArrow);

    // Smooth scroll function
    function smoothScroll(distance, duration) {
        const start = pos;
        const startTime = performance.now();

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            pos = start + distance * progress;
            if (pos <= -track.scrollWidth / 2) pos += track.scrollWidth / 2;
            if (pos > 0) pos -= track.scrollWidth / 2;
            track.style.transform = `translateX(${pos}px)`;
            if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    leftArrow.addEventListener('click', () => smoothScroll(200, 300));   // scroll left 200px over 0.3s
    rightArrow.addEventListener('click', () => smoothScroll(-200, 300)); // scroll right 200px over 0.3s

    // Auto sliding
    function slide() {
        if (isElementInViewport(slider) && !isPaused) {
            pos -= speed;
            if (pos <= -track.scrollWidth / 2) pos = 0;
            track.style.transform = `translateX(${pos}px)`;
        }
        requestAnimationFrame(slide);
    }

    slide();
});

// ================= MODAL IMAGE VIEW =================
document.querySelectorAll('.slider-track img').forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.cursor = 'pointer';
        modal.innerHTML = `<img src="${img.src}" style="max-width:80%; max-height:80%; border-radius:10px;">`;
        modal.addEventListener('click', () => modal.remove());
        document.body.appendChild(modal);
    });
});

