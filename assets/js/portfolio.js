// Filtrado de proyectos
const filters = document.querySelectorAll('.portfolio-filters button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

const projectData = {
    1: {
        title: "Deluxe Hosting",
        description: "Plataforma de hosting moderna y elegante con panel de control personalizado. Incluye sistema de facturación, gestión de dominios y soporte técnico 24/7.",
        tech: "React.js, Node.js, MongoDB, Docker",
        client: "Deluxe Hosting Co.",
        year: "2024",
        image: "/assets/img/portfolio/deluxe_hosting.jpg"
    },
    2: {
        title: "Portfolio Creativo",
        description: "Portfolio profesional para artista digital con galería interactiva, sistema de filtrado por categorías y contacto directo.",
        tech: "Vue.js, Tailwind CSS, Firebase",
        client: "Creative Studio",
        year: "2024",
        image: "/assets/img/portfolio/portfolio_2.jpg"
    },
    3: {
        title: "Boldo Business",
        description: "Sitio web corporativo con diseño moderno, integración de blog, newsletter y panel de administración personalizado.",
        tech: "Next.js, Strapi CMS, PostgreSQL",
        client: "Boldo Corp.",
        year: "2024",
        image: "/assets/img/portfolio/boldo.jpg"
    }
};

function toggleItems(selectedFilter) {
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (selectedFilter === 'all' || item.getAttribute('data-category') === selectedFilter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        }, 300);
    });
}

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const selectedFilter = filter.getAttribute('data-filter');
        toggleItems(selectedFilter);
    });
});

portfolioItems.forEach(item => {
    item.style.transition = 'all 0.3s ease';
});

toggleItems('all');

const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalClient = document.getElementById('modalClient');
const modalYear = document.getElementById('modalYear');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const projectId = item.getAttribute('data-project');
        const project = projectData[projectId];
        
        modalImage.src = project.image;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTech.textContent = project.tech;
        modalClient.textContent = project.client;
        modalYear.textContent = project.year;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 300);
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    }
}); 