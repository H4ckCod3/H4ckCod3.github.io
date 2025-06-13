
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const modals = document.querySelectorAll('.service-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const buttons = document.querySelectorAll('.more-info-btn');
    
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const animateOnScroll = () => {
        serviceCards.forEach((card, index) => {
            if (isInViewport(card)) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.service-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    const tiendaModal = document.getElementById('modal-tienda');
    if (tiendaModal) {
        const images = [
            '/assets/img/portfolio/Web_2.png',
            '/assets/img/portfolio/boldo.jpg',
            '/assets/img/portfolio/portfolio_2.jpg',
            '/assets/img/portfolio/deluxe_hosting.jpg'
        ];
        let current = 0;
        const imgEl = tiendaModal.querySelector('.gallery-image');
        const leftBtn = tiendaModal.querySelector('.gallery-arrow.left');
        const rightBtn = tiendaModal.querySelector('.gallery-arrow.right');

        function showImage(idx) {
            if (imgEl) {
                imgEl.src = images[idx];
            }
        }
        if (leftBtn && rightBtn && imgEl) {
            leftBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                current = (current - 1 + images.length) % images.length;
                showImage(current);
            });
            rightBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                current = (current + 1) % images.length;
                showImage(current);
            });
        }
        setInterval(() => {
            if (tiendaModal.classList.contains('active')) {
                current = (current + 1) % images.length;
                showImage(current);
            }
        }, 10000);
    }
}); 