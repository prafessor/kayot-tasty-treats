import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';



// ========================зміна кольору посилань на сторінки====================


document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо поточний шлях URL
    const currentPage = window.location.pathname;
    const homeLink = document.querySelector('.header-nav-home');
    const favoritesLink = document.querySelector('.header-nav-favorites');
  
    // Якщо поточний шлях містить 'index.html', робимо "Home" активним
    if (currentPage.includes('index.html')) {
      homeLink.classList.add('header-nav-active');
    } 
    // Якщо поточний шлях містить 'favorites.html', робимо "Favorites" активним
    else if (currentPage.includes('favorites.html')) {
      favoritesLink.classList.add('header-nav-active');
    }
  });


//   ==============================перемикання теми==================================

const changeColor = document.querySelector('.icon-change-color');
const circle = document.querySelector('.icon-change-color-circle');

changeColor.addEventListener('click', () => {
    circle.classList.toggle('clicked');
});

//   ==============================перемикання теми модального вікна==================================

const modalChangeColor = document.querySelector('.header-modal-icon-change-color');
const modalCircle = document.querySelector('.header-modal-icon-change-color-circle');

modalChangeColor.addEventListener('click', () => {
  modalCircle.classList.toggle('clicked');
});


//  ==============================відкриття модального вікна ===========================

const burger = document.querySelector(".icon-align-justify");
const headerModalWindow = document.querySelector(".header-modal-window");
const iconX = document.querySelector(".header-icon-x");
const body = document.querySelector('body');

burger.addEventListener("click", () => {
  headerModalWindow.classList.add('header-modal-window-active'); 
  body.classList.add('no-scroll');

});

iconX.addEventListener("click", () => {
  headerModalWindow.classList.remove('header-modal-window-active');
  body.classList.remove('no-scroll'); 
});

//  ==============================відкриття order-now===========================

const shoppingCart = document.querySelector(".icon-shopping-cart");
const orderNowIconX = document.querySelector(".order-now-icon-x");

const orderNow = document.querySelector(".order-now");
const orderNowform = document.querySelector("form.order-now-form");



shoppingCart.addEventListener("click", () => {
  orderNow.classList.remove('order-now-is-open'); 
  orderNowform.classList.remove('order-now-form-is-open'); 
  body.classList.add('no-scroll');

});

orderNowIconX.addEventListener("click", () => {
  orderNow.classList.add('order-now-is-open'); 
  orderNowform.classList.add('order-now-form-is-open'); 
  body.classList.remove ('no-scroll');
});

//  ==============================обробка інформації з order-now===========================
const nameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone-number");
const emailInput = document.getElementById("header-email");

// Додаємо/видаляємо червоний фон для інпутів при валідації
function validateInput(input, regex, errorMessage) {
  if (!regex.test(input.value.trim())) {
    input.classList.add('invalid');  // Додаємо червоний фон
    showError(errorMessage);  // Показуємо помилку
    return false;
  }
  input.classList.remove('invalid');  // Якщо валідація пройдена, прибираємо червоний фон
  return true;
}

phoneInput.value = '+380'; 
// Перевірка форми при натисканні на кнопку
orderNowform.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  // Перевірка на пусті поля
  if (!nameInput.value.trim() || !phoneInput.value.trim() || !emailInput.value.trim()) {
    showError("Please fill in all required fields!");
    // Додаємо червоний фон до порожніх полів
    if (!nameInput.value.trim()) nameInput.classList.add('invalid');
    if (!phoneInput.value.trim()) phoneInput.classList.add('invalid');
    if (!emailInput.value.trim()) emailInput.classList.add('invalid');
    return; // Не дозволяємо надсилати форму
  }

  // Валідація імені (мінімум 2 символи, тільки букви)
  if (!validateInput(nameInput, /^[A-Za-zA-Яа-яЇїІіЄєҐґ]{2,}$/, "The name must contain only letters and be at least 2 characters!")) {
    isValid = false;
  }

  // Валідація телефону (+380XXXXXXXXX)
  if (!validateInput(phoneInput, /^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX!")) {
    isValid = false;
  }

  // Валідація email
  if (!validateInput(emailInput, /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Enter a valid email!")) {
    isValid = false;
  }

  if (isValid) {
    iziToast.success({
      title: "Successfully!",
      message: "The form has been sent!",
      position: "topRight",
    });

    // Очищення форми після успішної відправки
    orderNow.classList.add('order-now-is-open'); 
    orderNowform.classList.add('order-now-form-is-open'); 
    body.classList.remove ('no-scroll');
    
    // Очищуємо форму та видаляємо червоний фон
    orderNowform.reset();  // Скидає значення полів
    nameInput.classList.remove('invalid');  // Видаляє червоний фон
    phoneInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
  }
});

// Функція для відображення iziToast помилки
function showError(message) {
  iziToast.error({
    title: "error",
    message: message,
    position: "topRight",
  });
}




//  ==============================закриття модальних вікон ескейпом та відкриття ентером ===========================

window.addEventListener('keydown', closeFormByEsc);

function closeFormByEsc (event) {
  if (event.code === 'Escape') {
    orderNow.classList.add('order-now-is-open'); 
    orderNowform.classList.add('order-now-form-is-open'); 
// видаляю неактив з боді
    body.classList.remove ('no-scroll');
// закривається модалка на мобільному, на всяк випадок 
    headerModalWindow.classList.remove('header-modal-window-active');

  }

  if (event.code === 'Enter') {
    orderNow.classList.remove('order-now-is-open'); 
    orderNowform.classList.remove('order-now-form-is-open'); 
    body.classList.add('no-scroll');
  }

};

