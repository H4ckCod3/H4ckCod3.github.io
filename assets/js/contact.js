const contactForm = document.querySelector('.contact-form');


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function handleSubmit(e) {
    e.preventDefault();
    
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    
    if (!name || !email || !subject || !message) {
        alert('Por favor, rellena todos los campos');
        return;
    }
    
    
    if (!isValidEmail(email)) {
        alert('Por favor, introduce un email válido');
        return;
    }
    
    
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
}


contactForm.addEventListener('submit', handleSubmit);


const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    
    if (input.value.trim()) {
        input.classList.add('active');
    }

    input.addEventListener('focus', () => {
        input.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.classList.remove('active');
        }
    });
}); 