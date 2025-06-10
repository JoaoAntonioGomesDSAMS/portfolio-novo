document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    });

    // Cursor Personalizado
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Efeito hover no cursor
    const hoverElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .social-link, .menu-toggle');
    
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

    // Navbar Scroll
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Ativar link correspondente à seção
        const scrollPos = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        
                        // Mover indicador
                        const linkRect = link.getBoundingClientRect();
                        const navRect = document.querySelector('.navbar-links').getBoundingClientRect();
                        
                        navIndicator.style.width = `${linkRect.width}px`;
                        navIndicator.style.left = `${linkRect.left - navRect.left}px`;
                    }
                });
            }
        });
    });

    // Menu Mobile
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
        });
    });

    // Animação de digitação
    const typed = new Typed('.typing', {
        strings: [' Análise e Desenvolvimento de Sistemas'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Animação de título do hero
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.transform = 'translateY(0)';
            word.style.opacity = '1';
        }, index * 300);
    });

    // Filtro de projetos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Adicionar active ao botão clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animação das barras de habilidades
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
    
    // Observer para animar habilidades quando a seção estiver visível
    const skillsSection = document.querySelector('#habilidades');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);

    // Back to Top
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Smooth Scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Formulário de contato
    const contactForm = document.getElementById('form-contato');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.backgroundColor = '#388E3C';
            
            // Resetar formulário
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = 'Enviar Mensagem';
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                
                // Resetar labels
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                    if (input.value === '') {
                        input.nextElementSibling.style.top = '1.5rem';
                        input.nextElementSibling.style.fontSize = '1.6rem';
                    }
                });
            }, 2000);
        }, 1500);
    });

    // Efeito hover nos cards de projeto
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

// Classe Typed para animação de digitação
class Typed {
    constructor(el, options) {
        this.element = document.querySelector(el);
        this.strings = options.strings || [];
        this.typeSpeed = options.typeSpeed || 100;
        this.backSpeed = options.backSpeed || 50;
        this.loop = options.loop || false;
        this.loopCount = options.loopCount || Infinity;
        this.stringsIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.tick();
    }
    
    tick() {
        const currentString = this.strings[this.stringsIndex];
        
        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }
        
        this.element.textContent = currentString.substring(0, this.charIndex);
        
        if (!this.isDeleting && this.charIndex === currentString.length) {
            this.isDeleting = true;
            setTimeout(() => this.tick(), 1000);
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.stringsIndex++;
            
            if (this.stringsIndex === this.strings.length) {
                this.stringsIndex = 0;
                this.loopCount--;
                
                if (!this.loop && this.loopCount <= 0) {
                    return;
                }
            }
            
            setTimeout(() => this.tick(), 500);
        } else {
            const speed = this.isDeleting ? this.backSpeed : this.typeSpeed;
            setTimeout(() => this.tick(), speed);
        }
    }
}