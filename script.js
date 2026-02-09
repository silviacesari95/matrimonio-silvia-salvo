// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger to X
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// Smooth Scroll for Anchor Links (if not supported natively)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Countdown Timer
const weddingDate = new Date('Oct 11, 2026 11:00:00').getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    // Time calculations
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById('countdown').innerHTML = `
        <div class="time-box">
            <span class="num">${d}</span>
            <span class="text">Giorni</span>
        </div>
        <div class="time-box">
            <span class="num">${h}</span>
            <span class="text">Ore</span>
        </div>
        <div class="time-box">
            <span class="num">${m}</span>
            <span class="text">Minuti</span>
        </div>
        <div class="time-box">
            <span class="num">${s}</span>
            <span class="text">Secondi</span>
        </div>
    `;

    if (gap < 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "<h3>Oggi è il grande giorno!</h3>";
    }
}, 1000);

// CSS for Countdown (injected dynamically for simplicity, or move to CSS file)
const style = document.createElement('style');
style.innerHTML = `
    .countdown {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin: 2rem 0;
    }
    .time-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255, 255, 255, 0.2);
        padding: 1rem;
        border-radius: 8px;
        backdrop-filter: blur(5px);
        min-width: 80px;
    }
    .num {
        font-size: 2rem;
        font-weight: 700;
    }
    .text {
        font-size: 0.8rem;
        text-transform: uppercase;
    }
    @media (max-width: 600px) {
        .countdown {
            gap: 1rem;
        }
        .time-box {
            min-width: 60px;
            padding: 0.5rem;
        }
        .num {
            font-size: 1.5rem;
        }
    }
`;
document.head.appendChild(style);

