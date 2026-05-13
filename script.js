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
// Impostato sull'orario di Roma (UTC+2 in quel periodo)
const weddingDate = new Date('2026-10-11T11:00:00+02:00').getTime();

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

// Copia IBAN function
const copyBtn = document.getElementById('copy-iban');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const ibanText = document.getElementById('iban-text').innerText;
        navigator.clipboard.writeText(ibanText).then(() => {
            const copyMsg = document.getElementById('copy-msg');
            copyMsg.style.display = 'inline';
            setTimeout(() => {
                copyMsg.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error('Errore durante la copia: ', err);
        });
    });
}

// Initialize Map (Leaflet)
const mapElement = document.getElementById('locations-map');
if (mapElement) {
    // Coordinate centrali per inquadrare tutte le location
    const map = L.map('locations-map').setView([40.350, 18.175], 15);

    // Google Maps Tiles
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        maxZoom: 20
    }).addTo(map);

    // Custom icon per il ristornate (sposi fianco a fianco senza cerchio)
    const restaurantIcon = L.divIcon({
        html: '<div style="font-size: 38px; display: flex; align-items: center; justify-content: center; white-space: nowrap; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.5)); letter-spacing: -12px;">👰🤵</div>',
        className: '',
        iconSize: [60, 40],
        iconAnchor: [30, 35],
        popupAnchor: [0, -35]
    });

    // Custom icon per gli alloggi (letto)
    const hotelIcon = L.divIcon({
        html: '<div style="font-size: 20px; background: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.2); border: 2px solid #555;">🛏️</div>',
        className: '',
        iconSize: [35, 35],
        iconAnchor: [17, 17],
        popupAnchor: [0, -17]
    });

    const locations = [
        { name: "🥂 Torre del Parco (Cerimonia e Ricevimento)", coords: [40.347208, 18.179488], isRestaurant: true },
        { name: "Lo Studio di Viale Lo Re", coords: [40.349940, 18.173587], isRestaurant: false },
        { name: "LecceMia B&B", coords: [40.349303, 18.177974], isRestaurant: false },
        { name: "Suite San Biagio", coords: [40.348753, 18.175047], isRestaurant: false },
        { name: "Daf La Casetta", coords: [40.348006, 18.178791], isRestaurant: false },
        { name: "Fram Luxury Apartment", coords: [40.349940, 18.181735], isRestaurant: false },
        { name: "Mamma Sisi B&B", coords: [40.353004, 18.173583], isRestaurant: false }
    ];

    locations.forEach(loc => {
        const marker = L.marker(loc.coords, { icon: loc.isRestaurant ? restaurantIcon : hotelIcon }).addTo(map);
        marker.bindPopup(`<strong>${loc.name}</strong>`);
        if (loc.isRestaurant) {
            marker.openPopup();
        }
    });

    // Aggiungi un po' di padding per assicurarsi che i marker siano visibili
    const group = new L.featureGroup(locations.map(loc => L.marker(loc.coords)));
    map.fitBounds(group.getBounds(), { padding: [30, 30] });
}

