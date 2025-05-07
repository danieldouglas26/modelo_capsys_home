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