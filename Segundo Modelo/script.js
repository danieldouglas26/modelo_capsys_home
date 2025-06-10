document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';
            primaryNav.setAttribute('data-visible', !isVisible);
            navToggle.setAttribute('aria-expanded', !isVisible);

            // Opcional: Bloquear scroll do body quando o menu estiver aberto
            document.body.classList.toggle('no-scroll', !isVisible);
        });

        // Fechar menu ao clicar em um link (para SPAs ou mesma página)
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.getAttribute('data-visible') === 'true') {
                    primaryNav.setAttribute('data-visible', false);
                    navToggle.setAttribute('aria-expanded', false);
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }


    // Update Copyright Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});

// CSS para bloquear scroll (adicionar ao style.css se for usar)
/*
body.no-scroll {
    overflow: hidden;
}
*/

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // A seção/item estará 20% visível para disparar a animação
    };

    function createObserver(elements, delay = 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => { // Adiciona um pequeno atraso para cada item, se desejado
                        entry.target.classList.add('is-visible');
                    }, delay);
                    observer.unobserve(entry.target); // Opcional: Para animar apenas uma vez
                }
            });
        }, observerOptions);

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    createObserver(sections);

    // Para Service Cards e Portfolio Items, podemos adicionar um atraso escalonado
    serviceCards.forEach((card, index) => {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100); // Atraso de 100ms para cada card
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        cardObserver.observe(card);
    });

    portfolioItems.forEach((item, index) => {
        const itemObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100); // Atraso de 100ms para cada item
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        itemObserver.observe(item);
    });

    // Animação inicial para o Hero
    // Os elementos do hero já têm animações CSS com delay definidos para aparecer ao carregar a página.
    // Não é necessário um Intersection Observer para o hero a menos que você queira que ele anime apenas após a rolagem.
});