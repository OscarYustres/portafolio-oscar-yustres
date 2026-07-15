
        document.addEventListener('DOMContentLoaded', function() {

            // ==================== MODO OSCURO ====================
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;

            const savedTheme = localStorage.getItem('theme') || 'light';
            html.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);

            themeToggle.addEventListener('click', function() {
                const current = html.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                updateThemeIcon(next);
            });

            function updateThemeIcon(theme) {
                const icon = themeToggle.querySelector('i');
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }

            // ==================== MENÚ MÓVIL ====================
            const mobileToggle = document.getElementById('mobileToggle');
            const navList = document.getElementById('navList');

            mobileToggle.addEventListener('click', function() {
                const isOpen = navList.classList.toggle('active');
                this.classList.toggle('active');
                this.setAttribute('aria-expanded', isOpen);
            });

            // Cerrar menú al hacer click en un enlace
            document.querySelectorAll('.nav__link').forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                });
            });

            // ==================== SCROLL SUAVE ====================
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });

            // ==================== CONTADORES ANIMADOS ====================
            const counters = document.querySelectorAll('.stat__number');

            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const text = el.textContent;
                        const clean = text.replace(/[^0-9]/g, '');
                        const target = parseInt(clean);
                        if (!target) return;

                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            const suffix = text.includes('K+') ? 'K+' : text.includes('+') ? '+' : '';
                            el.textContent = Math.floor(current) + suffix;
                        }, 30);

                        counterObserver.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(c => counterObserver.observe(c));

            

            // ==================== NOTIFICACIONES ====================
            function showNotification(message, type = 'success') {
                const notification = document.createElement('div');
                notification.className = `notification notification--${type}`;
                notification.textContent = message;

                document.body.appendChild(notification);

                setTimeout(() => notification.classList.add('show'), 100);

                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => notification.remove(), 300);
                }, 5000);
            }

            // ==================== HEADER SCROLL ====================
            const header = document.querySelector('.header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 80) {
                    header.style.boxShadow = 'var(--shadow-md)';
                } else {
                    header.style.boxShadow = 'none';
                }
            });

            // ==================== CONSOLA ====================
            console.log('%c🚀 Oscar Yustres - Arquitecto de Soluciones', 'font-size:20px; font-weight:bold; color:#0066FF;');
            console.log('%cIngeniero de Sistemas · Desarrollador Full Stack', 'font-size:14px; color:#64748B;');
            console.log('%c📧 oscar_dyc@hotmail.com | 🔗 github.com/OscarYustres', 'font-size:12px; color:#64748B;');

        });


        const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

    