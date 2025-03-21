const scrollButton = document.querySelector('.icon-arrow');

function checkScrollPosition() {
    if (window.scrollY > 300) { 
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
}

window.addEventListener('scroll', checkScrollPosition);

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});