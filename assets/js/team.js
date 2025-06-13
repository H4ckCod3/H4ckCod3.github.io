
const teamData = {
    1: {
        image: "/assets/img/sobrenosotros/sergio.jpg",
        bio: "Líder tecnológico con más de 10 años de experiencia en desarrollo web y arquitectura de software. Especializado en tecnologías frontend y backend modernas.",
        skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "Arquitectura de Software"]
    },
    2: {
        image: "/assets/img/sobrenosotros/jose.jpg",
        bio: "Diseñadora UX/UI con pasión por crear experiencias digitales intuitivas y atractivas. Más de 8 años de experiencia en diseño digital.",
        skills: ["UI/UX Design", "Figma", "Adobe XD", "Sketch", "Design Systems", "User Research"]
    },
    3: {
        image: "/assets/img/sobrenosotros/Adrian.jpg",
        bio: "Estratega de marketing digital con experiencia en optimización de conversión y análisis de datos. Especializado en growth hacking y SEO.",
        skills: ["Marketing Digital", "SEO", "Google Analytics", "Growth Hacking", "Content Strategy", "Social Media"]
    }
};

const modal = document.getElementById('teamModal');
const modalImage = document.getElementById('modalMemberImage');
const modalName = document.getElementById('modalMemberName');
const modalPosition = document.getElementById('modalMemberPosition');
const modalBio = document.getElementById('modalMemberBio');
const modalSkills = document.getElementById('modalMemberSkills');
const closeModal = document.querySelector('.team-modal .close-modal');

function showMemberDetails(memberId) {
    const member = teamData[memberId];
    
    modalImage.src = member.image;
    modalImage.alt = member.name;
    modalName.textContent = member.name;
    modalPosition.textContent = member.position;
    modalBio.textContent = member.bio;
    
    modalSkills.innerHTML = '';
    member.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        modalSkills.appendChild(skillTag);
    });
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', () => {
        const memberId = member.getAttribute('data-member');
        showMemberDetails(memberId);
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}); 