document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const primaryMenu = document.getElementById('primary-menu');
    const body = document.body; // Adicionei uma referência ao body

    if (menuToggle && primaryMenu) {
        menuToggle.addEventListener('click', () => {
            const isVisible = primaryMenu.getAttribute('data-visible') === 'true';
            primaryMenu.setAttribute('data-visible', !isVisible);
            menuToggle.setAttribute('aria-expanded', !isVisible);
            body.classList.toggle('nav-open', !isVisible); // Usa a referência 'body'
        });

        // Close nav when a link is clicked
        primaryMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (primaryMenu.getAttribute('data-visible') === 'true') {
                    primaryMenu.setAttribute('data-visible', 'false');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    body.classList.remove('nav-open'); // Usa a referência 'body'
                }
            });
        });
    }

    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- BACK TO TOP BUTTON VISIBILITY AND SCROLL ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Adiciona evento de clique para rolar suavemente para o topo
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão do link
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    // Seleciona todos os elementos com a classe padronizada 'animate-on-scroll'
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    if (animateOnScrollElements.length > 0) {
        const observerOptions = {
            root: null, // Observa a viewport
            rootMargin: '0px',
            threshold: 0.1 // O callback será executado quando 10% do elemento estiver visível
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe que ativa a animação
                    entry.target.classList.add('is-visible');
                    // Para de observar o elemento para que a animação não se repita
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateOnScrollElements.forEach(element => {
            // Não é necessário adicionar transitionDelay aqui via JS se você já tem nth-child no CSS
            // para service-card e portfolio-item. Se quiser delays individuais para outros
            // elementos, você pode adicionar um `data-delay` no HTML e ler aqui.
            // Exemplo:
            // const delay = element.dataset.delay ? parseInt(element.dataset.delay) : 0;
            // element.style.transitionDelay = `${delay}ms`;

            observer.observe(element);
        });
    }

    // --- UPDATE COPYRIGHT YEAR ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});