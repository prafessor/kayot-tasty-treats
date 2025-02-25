// ========================зміна кольору посилань на сторінки====================


document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо поточний шлях URL
    const currentPage = window.location.pathname;
    const homeLink = document.querySelector('.header-nav-home');
    const favoritesLink = document.querySelector('.header-nav-favorites');
  
    // Якщо поточний шлях містить 'index.html', робимо "Home" активним
    if (currentPage.includes('index.html')) {
      homeLink.classList.add('active');
    } 
    // Якщо поточний шлях містить 'favorites.html', робимо "Favorites" активним
    else if (currentPage.includes('favorites.html')) {
      favoritesLink.classList.add('active');
    }
  });


//   ==============================перемикання теми==================================

const changeColor = document.querySelector('.icon-change-color');
const circle = document.querySelector('.icon-change-color-circle');

changeColor.addEventListener('click', () => {
    circle.classList.toggle('clicked');
});

