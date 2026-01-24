const header = document.querySelector('.dashboard-header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
});