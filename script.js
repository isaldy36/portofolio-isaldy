// 1. Navbar Sticky & Hamburger Menu
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. Typing Effect (Efek Mengetik)
const typingText = document.querySelector('.typing-text');
const words = ["Web Developer", "SMK Student", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause sebelum menghapus
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// 3. Scroll Animation (Fade In saat Scroll)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
hiddenElements.forEach((el) => observer.observe(el));

// 4. Contact Form Validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Reset pesan error
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    
    // Validasi Nama
    if (name.value.trim() === '') {
        showError(name, 'Nama harus diisi');
        isValid = false;
    }

    // Validasi Email
    if (!validateEmail(email.value)) {
        showError(email, 'Email tidak valid');
        isValid = false;
    }

    // Validasi Pesan
    if (message.value.trim() === '') {
        showError(message, 'Pesan tidak boleh kosong');
        isValid = false;
    }

    if (isValid) {
        alert(`Terima kasih, ${name.value}! Pesan Anda telah terkirim (Simulasi).`);
        contactForm.reset();
    }
});

function showError(input, msg) {
    const errorSmall = input.nextElementSibling;
    errorSmall.textContent = msg;
    errorSmall.style.display = 'block';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}