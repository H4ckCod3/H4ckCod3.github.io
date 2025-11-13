
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        
        document.querySelectorAll('.faq-question').forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.setAttribute('aria-expanded', 'false');
                otherButton.parentElement.classList.remove('active');
            }
        });

        button.setAttribute('aria-expanded', String(!expanded));
        button.parentElement.classList.toggle('active');
    });
});

const projectData = {
    1: {
        title: "Deluxe Hosting",
        description: "Plataforma de hosting moderna y elegante con panel de control personalizado. Incluye sistema de facturación, gestión de dominios y soporte técnico 24/7.",
        tech: "React.js, Node.js, MongoDB, Docker",
        client: "Deluxe Hosting Co.",
        year: "2024",
        image: "assets/img/portfolio/deluxe_hosting.jpg"
    },
    2: {
        title: "Portfolio Creativo",
        description: "Portfolio profesional para artista digital con galería interactiva, sistema de filtrado por categorías y contacto directo.",
        tech: "Vue.js, Tailwind CSS, Firebase",
        client: "Creative Studio",
        year: "2024",
        image: "assets/img/portfolio/portfolio_2.jpg"
    },
    3: {
        title: "Boldo Business",
        description: "Sitio web corporativo con diseño moderno, integración de blog, newsletter y panel de administración personalizado.",
        tech: "Next.js, Strapi CMS, PostgreSQL",
        client: "Boldo Corp.",
        year: "2024",
        image: "assets/img/portfolio/boldo.jpg"
    }
};

const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalClient = document.getElementById('modalClient');
const modalYear = document.getElementById('modalYear');
const closeModal = document.querySelector('.close-modal');

if (modal) {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            const project = projectData[projectId];
            if (!project) return;
            
            if (modalImage) modalImage.src = project.image;
            if (modalTitle) modalTitle.textContent = project.title;
            if (modalDescription) modalDescription.textContent = project.description;
            if (modalTech) modalTech.textContent = project.tech;
            if (modalClient) modalClient.textContent = project.client;
            if (modalYear) modalYear.textContent = project.year;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
}

if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    });
}

window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

// Hero rotating roles (animated word)
document.addEventListener('DOMContentLoaded', () => {
    const roleEl = document.getElementById('heroRole');
    if (!roleEl) return;

    roleEl.classList.add('animated-roles');

    const roles = [
        'Tienda online',
        'Página web',
        'Software',
        'Automatizaciones',
        'Gestión de redes sociales',
        'Marketing digital',
        'Diseño UI/UX',
        'SEO'
    ]; // excluye "Servicio personalizado"

    let idx = 0;
    const change = () => {
        // Primero sube y desaparece suavemente
        roleEl.classList.add('is-hidden');
        setTimeout(() => {
            idx = (idx + 1) % roles.length;
            roleEl.textContent = roles[idx];
            // Empieza desde abajo (invisible)
            roleEl.classList.remove('is-hidden');
            roleEl.classList.add('is-coming');
            // Fuerza un reflow para que la animación funcione correctamente
            void roleEl.offsetWidth;
            // Ahora aparece desde arriba bajando suavemente
            requestAnimationFrame(() => {
                roleEl.classList.remove('is-coming');
            });
        }, 400);
    };

    setInterval(change, 2000);
}); 