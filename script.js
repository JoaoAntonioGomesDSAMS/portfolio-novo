

document.addEventListener('DOMContentLoaded', function () {
    // 1. Animação do título
    const titleWords = document.querySelectorAll('.title-word');
    if (titleWords.length > 0) {
        titleWords.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }


    // 1. Preloader (se existir no HTML)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        });
    }

    // 2. Cursor Personalizado (se existir no HTML)
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Efeito hover no cursor
        const hoverElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .menu-toggle');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }

    // 3. Navbar Básico (sem animação de scroll)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // 4. Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (menuToggle && navbarLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navbarLinks.classList.remove('active');
            });
        });
    }

    // 5. Animação de digitação nativa
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const text = 'Análise e Desenvolvimento de Sistemas';
        let i = 0;
        const speed = 100; // velocidade em ms

        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Opcional: fazer efeito de apagar e repetir
                setTimeout(() => {
                    typingElement.textContent = '';
                    i = 0;
                    typeWriter();
                }, 2000);
            }
        }

        // Inicia a animação
        typeWriter();
    }
    // 6. Filtro de projetos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter)
                        ? 'block'
                        : 'none';
                });
            });
        });
    }

    // 7. Back to Top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('active', window.scrollY > 300);
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Smooth Scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 9. Efeito hover nos cards de projeto
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});