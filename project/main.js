const applyTheme = (theme) => {
    const body = document.body;
    const themeToggleImg = document.getElementById('theme-toggle-img');
    const mainImg1 = document.getElementById('logoImg');

    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggleImg.src = "img/icons8-солнце-50.png";
        mainImg1.src = "img/main_dark1.jpg";
    } else {
        body.classList.add('light-theme');
        themeToggleImg.src = "img/icons8-солнце-50.png";
        mainImg1.src = "img/main1.jpg";
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});

const toggleTheme = () => {
    const body = document.body;

    const themeToggleImg = document.getElementById('theme-toggle-img');
    const mainImg1 = document.getElementById('logoImg');

    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');

        themeToggleImg.src = "img/icons8-солнце-50.png";
        mainImg1.src = "img/main_dark1.jpg";
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');

        themeToggleImg.src = "img/icons8-солнце-50.png";
        mainImg1.src = "img/main1.jpg";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-menu-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});