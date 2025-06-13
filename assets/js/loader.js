document.addEventListener('DOMContentLoaded', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;

    document.body.appendChild(loader);

    if (!sessionStorage.getItem('loaderShown')) {
        document.body.classList.add('loading');
        
        loader.style.display = 'flex';
        
        const progress = loader.querySelector('.loader-progress');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.classList.remove('loading');
                }, 300);
                sessionStorage.setItem('loaderShown', 'true');
            } else {
                width += 2;
                progress.style.width = width + '%';
            }
        }, 10);
    } else {
        loader.style.display = 'none';
    }
}); 