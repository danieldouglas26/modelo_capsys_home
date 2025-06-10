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

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Função para remover a classe 'active' de todos os links
    const removeActiveClass = () => {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    };

    // Callback para o Intersection Observer
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' de todos os links
                removeActiveClass();
                
                // Adiciona 'active' ao link correspondente à seção visível
                const currentSectionId = entry.target.id;
                const correspondingLink = document.querySelector(`nav ul li a[href="#${currentSectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    // Opções para o Intersection Observer
    // rootMargin: Um valor negativo superior para que a seção esteja bem visível
    // threshold: 0.3 significa que a seção precisa estar 30% visível para ser considerada "ativa"
    const observerOptions = {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // Considera o centro da viewport
        threshold: 0 // Usamos rootMargin para determinar a interseção
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observa cada seção
    sections.forEach(section => {
        observer.observe(section);
    });

    // Código para o menu mobile (se você ainda não tem)
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('nav ul');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const visibility = primaryNav.getAttribute('data-visible');
            if (visibility === "false") {
                primaryNav.setAttribute('data-visible', "true");
                navToggle.setAttribute('aria-expanded', "true");
            } else {
                primaryNav.setAttribute('data-visible', "false");
                navToggle.setAttribute('aria-expanded', "false");
            }
        });

        // Fechar o menu mobile ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.setAttribute('data-visible', "false");
                navToggle.setAttribute('aria-expanded', "false");
            });
        });
    }
});