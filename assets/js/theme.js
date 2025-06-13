
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.querySelector('.theme-toggle svg');
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.innerHTML = `
                <path d="M12 3C10.8065 4.19347 10.136 5.81217 10.136 7.5C10.136 9.18783 10.8065 10.8065 12 12C13.1935 13.1935 14.8122 13.864 16.5 13.864C18.1878 13.864 19.8065 13.1935 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.9901 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.0099 3.00393 10.2004 3.68509 8.55585C4.36625 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
        } else {
            themeToggle.innerHTML = `
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                <path d="M12 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 21V23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M3 12H1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M23 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M4.22183 4.22183L5.63604 5.63604" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M18.364 18.364L19.7782 19.7782" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M4.22183 19.7782L5.63604 18.364" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M18.364 5.63604L19.7782 4.22183" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            `;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());

    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}); 