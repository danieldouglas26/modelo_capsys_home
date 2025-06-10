// scripts.js

document.addEventListener('DOMContentLoaded', function() {

    /**
     * 1. Menu Mobile (Hamburger)
     */
    const menuToggle = document.getElementById('menu-toggle');
    const primaryMenu = document.getElementById('primary-menu');

    if (menuToggle && primaryMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            primaryMenu.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll', !isExpanded); // Trava o scroll do body
        });

        // Fechar menu ao clicar em um link dentro dele (para SPAs ou navegação na mesma página)
        const menuLinks = primaryMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (primaryMenu.classList.contains('is-active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    primaryMenu.classList.remove('is-active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });

        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (primaryMenu.classList.contains('is-active') &&
                !primaryMenu.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                primaryMenu.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
            }
        });

        // Fechar menu ao pressionar a tecla 'Escape'
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && primaryMenu.classList.contains('is-active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                primaryMenu.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    /**
     * 2. Link Ativo no Menu (com base no scroll e seções visíveis)
     */
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = [];
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            sections.push({ link: link, section: section });
        }
    });

    function updateActiveLink() {
        let currentSectionId = '';
        const headerHeight = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 0;
        
        sections.forEach(item => {
            const sectionTop = item.section.offsetTop - headerHeight - 50; // 50px de offset
            const sectionBottom = sectionTop + item.section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                currentSectionId = item.section.id;
            }
        });

        // Lógica para quando está no topo da página ou nenhuma seção específica está "ativa"
        if (window.pageYOffset < sections[0]?.section.offsetTop - headerHeight - 50 && sections.length > 0) {
             // Se o primeiro link é para a home (ou o topo), ativa ele
            if (sections[0].link.getAttribute('href') === 'index.html' || sections[0].link.getAttribute('href') === '#') {
                 currentSectionId = sections[0].section.id;
            } else {
                // Nenhuma seção específica, então nenhum link ativo (ou o link da home se houver)
                 const homeLink = document.querySelector('.nav-menu a[href="index.html"]');
                 if (homeLink) homeLink.parentElement.classList.add('active');
            }
        }


        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.parentElement.classList.add('active');
            }
        });

        // Se nenhum link de âncora está ativo, verifica links de página completa
        if (!currentSectionId) {
            const pageUrl = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-menu a').forEach(link => {
                const linkUrl = link.getAttribute('href').split('/').pop();
                if (linkUrl === pageUrl) {
                    link.parentElement.classList.add('active');
                }
            });
        }
    }
    
    if (navLinks.length > 0) {
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Chama na carga da página
    } else {
        // Fallback para links não-âncora se não houver links âncora
        const pageUrl = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-menu a').forEach(link => {
            const linkUrl = link.getAttribute('href').split('/').pop();
             if (linkUrl === pageUrl || (pageUrl === 'index.html' && link.getAttribute('href') === '/')) {
                link.parentElement.classList.add('active');
            }
        });
    }


    /**
     * 3. Ano Atual no Footer
     */
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Ano de início da empresa (opcional, se quiser mostrar "Desde XXXX")
    const companyStartYearSpan = document.getElementById('company-start-year');
    if (companyStartYearSpan) {
        // O ano já está no HTML, este span é mais para identificação se precisar de lógica JS
        // Ex: const startYear = parseInt(companyStartYearSpan.textContent);
        // const yearsOfExperience = new Date().getFullYear() - startYear;
    }


    /**
     * 4. Animação de Scroll para Seções (Fade-in-up)
     */
    const elementsToAnimate = document.querySelectorAll('.hero-text, .hero-image-container, .content-section, .service-card, .portfolio-item, .footer-column'); 
    
    if (elementsToAnimate.length > 0 && "IntersectionObserver" in window) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px 0px -10% 0px', // Triga um pouco antes do elemento estar 100% visível na parte de baixo
            threshold: 0.1  // Pelo menos 10% do elemento visível
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Para animar apenas uma vez
                }
                // else { // Opcional: remover a classe se sair da visão para re-animar
                //    entry.target.classList.remove('is-visible');
                // }
            });
        };

        const elementObserver = new IntersectionObserver(observerCallback, observerOptions);
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in-up'); // Adiciona classe base para estado inicial da animação CSS
            elementObserver.observe(el);
        });
    } else {
        // Fallback para navegadores sem IntersectionObserver ou se não houver elementos para animar
        elementsToAnimate.forEach(el => el.classList.add('is-visible')); // Mostra tudo de uma vez
    }


    /**
     * 5. Efeito "Scrolled" no Header
     */
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        const scrollThreshold = 50; // Distância de scroll em pixels para ativar o efeito

        function handleHeaderScroll() {
            if (window.pageYOffset > scrollThreshold) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', handleHeaderScroll);
        handleHeaderScroll(); // Verifica no carregamento da página também
    }

}); // Fim do DOMContentLoaded

// Adicionar no CSS para a funcionalidade no-scroll:
// body.no-scroll { overflow: hidden; }