document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // AJUSTE: A função agora apenas controla os atributos, a animação do ícone é feita via CSS
    const toggleNav = () => {
        const isVisible = navMenu.getAttribute('data-visible') === 'true';
        navMenu.setAttribute('data-visible', !isVisible);
        navToggle.setAttribute('aria-expanded', !isVisible);
        document.body.classList.toggle('nav-open', !isVisible);
    };

    navToggle.addEventListener('click', toggleNav);

    // Close nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.getAttribute('data-visible') === 'true') {
                toggleNav();
            }
        });
    });

    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- ACTIVE LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- FADE-IN ANIMATION ON SCROLL ---
    const animatedItems = document.querySelectorAll('.animated-item');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedItems.forEach(item => {
        animationObserver.observe(item);
    });


    // --- UPDATE COPYRIGHT YEAR ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- BOTÃO VOLTAR AO TOPO ---
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) { // Verifica se o botão existe
        window.addEventListener('scroll', () => {
            // Mostra o botão após rolar 300 pixels para baixo
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }

});