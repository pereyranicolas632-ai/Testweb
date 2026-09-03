/* ============================================
   HUELLA CLUB DE ARTE - JAVASCRIPT PRINCIPAL
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- MENÚ HAMBURGUESA ----------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ---------- HEADER SCROLL ----------
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---------- ANIMACIONES AL SCROLL (Intersection Observer) ----------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar a elementos con clase .animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.obra-card, .testimonio-card, .miembro-card, .sobre-grid');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ---------- FORMULARIO DE CONTACTO ----------
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validación básica
            if (!nombre || !email || !mensaje) {
                showMessage('Por favor, completá todos los campos obligatorios.', 'error');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showMessage('Por favor, ingresá un email válido.', 'error');
                return;
            }
            
            // Simular envío (en producción se envía a un servidor)
            const btn = contactForm.querySelector('.btn-enviar');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                showMessage('¡Mensaje enviado con éxito! Te responderemos a la brevedad.', 'success');
                contactForm.reset();
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
            }, 1500);
        });
    }

    function showMessage(text, type) {
        if (!formMessage) return;
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        
        // Auto ocultar después de 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // ---------- SCROLL SUAVE PARA ENLACES INTERNOS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- AÑO AUTOMÁTICO EN FOOTER ----------
    const yearSpans = document.querySelectorAll('.footer-bottom p:first-child');
    yearSpans.forEach(span => {
        const currentYear = new Date().getFullYear();
        span.textContent = span.textContent.replace('2026', currentYear);
    });

});