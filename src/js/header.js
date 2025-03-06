import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ========================зміна кольору посилань на сторінки====================

  const currentPage = window.location.pathname;
  const homeLink = document.querySelector('.header-nav-home');
  const favoritesLink = document.querySelector('.header-nav-favorites');
  
  // Якщо поточний шлях містить 'index.html', робимо "Home" активним
  if (currentPage === '/' || currentPage.includes('index.html')) {
  homeLink.classList.add('header-nav-active');
  } 
  // Якщо поточний шлях містить 'favorites.html', робимо "Favorites" активним
  else if (currentPage.includes('favorites.html')) {
    favoritesLink.classList.add('header-nav-active');
  }
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
  orderNow.classList.add('order-now-is-open'); 
  orderNowform.classList.add('order-now-form-is-open'); 
  body.classList.add('no-scroll');

  window.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeFormByEsc);
});

orderNowIconX.addEventListener("click", () => {
  orderNow.classList.remove('order-now-is-open'); 
  orderNowform.classList.remove('order-now-form-is-open'); 
  body.classList.remove ('no-scroll');

  window.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeFormByEsc);
});

//  ==============================закриття order-now по кліку на сірий фон===========================

const closeModal = event => {
  if (orderNow.contains(event.target) && !orderNowform.contains(event.target) ) {
    orderNow.classList.remove('order-now-is-open'); 
    orderNowform.classList.remove('order-now-form-is-open'); 
    body.classList.remove ('no-scroll');
    
    window.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeFormByEsc);
    
  }
};

//  ==============================закриття модальних вікон ескейпом ===========================

function closeFormByEsc (event) {
  if (event.code === 'Escape') {
    orderNow.classList.remove('order-now-is-open'); 
    orderNowform.classList.remove('order-now-form-is-open'); 
    body.classList.remove ('no-scroll');
  
    window.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeFormByEsc);
      
  // закривається модалка на мобільному, на всяк випадок 
    headerModalWindow.classList.remove('header-modal-window-active');
  }
};
  
//  ==============================обробка інформації з order-now===========================

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("number");
const emailInput = document.getElementById("email");

function validateInput(input, regex, errorMessage) {
  if (!regex.test(input.value.trim())) {
    input.classList.add('invalid'); 
    showError(errorMessage);  
    return false;
  }
  input.classList.remove('invalid');  
  return true;
}

orderNowform.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  if (!nameInput.value.trim() || !phoneInput.value.trim() || !emailInput.value.trim()) {
    showError("Please fill in all required fields!");

    if (!nameInput.value.trim()) nameInput.classList.add('invalid');
    if (!phoneInput.value.trim()) phoneInput.classList.add('invalid');
    if (!emailInput.value.trim()) emailInput.classList.add('invalid');
    return; 
  }

  if (!validateInput(nameInput, /^[A-Za-zA-Яа-яЇїІіЄєҐґ]{2,}$/, "The name must contain only letters and be at least 2 characters!")) {isValid = false;}

  if (!validateInput(phoneInput, /^\+380\d{9}$/, "Phone must be in format +380XX XXX XX XX!")) {isValid = false;}

  if (!validateInput(emailInput, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.[a-zA-Z]{2,}$/, "Enter a valid email!")) {isValid = false;}

  if (isValid) {
    iziToast.success({
      title: "Successfully!",
      message: "The form has been sent!",
      position: "topRight",
    });

    orderNow.classList.remove('order-now-is-open'); 
    orderNowform.classList.remove('order-now-form-is-open'); 
    body.classList.remove ('no-scroll');
    nameInput.classList.remove('invalid');  
    phoneInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');

    orderNowform.reset();  
    localStorage.removeItem(`feedback-form`);
  }
});

function showError(message) {
  iziToast.error({
    title: "error",
    message: message,
    position: "topRight",
  });
}

//  =================отримування інформації для order-now з локального сховища користувача===============

orderNowform.addEventListener ('change', remebInfoLS);

let formInfo = {
  name: '',
  number: '',
  email: '',
  textarea: '',
};

function remebInfoLS (event) {
  const valueInfo = event.target.value;
  const valueInfoName = event.target.name; 
  formInfo[valueInfoName]=valueInfo;
  localStorage.setItem(`feedback-form`, JSON.stringify(formInfo))
};

function returnInfoLS (){
try {
  if (localStorage.length ===0) {return;}
  const getInfo = JSON.parse(localStorage.getItem(`feedback-form`))
  formInfo=getInfo;
  for (const key in getInfo) {orderNowform.elements[key].value = getInfo[key]} 
} 
catch (er) {console.log(er);}
};

returnInfoLS ();


//   ==============================перемикання теми основна іконка ==================================

const changeColor = document.querySelector('.icon-change-color');
const circle = document.querySelector('.icon-change-color-circle');

if (changeColor && circle) {
  changeColor.addEventListener('click', () => {
  circle.classList.toggle('clicked');
  });
}
//   ==============================перемикання теми іконка у модальному вікні==================================

const modalChangeColor = document.querySelector('.header-modal-icon-change-color');
const modalCircle = document.querySelector('.header-modal-icon-change-color-circle');

if (modalChangeColor && modalCircle) {
  modalChangeColor.addEventListener('click', () => {
  modalCircle.classList.toggle('clicked');
});}

//   ==============================перемикання теми ==================================

document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".icon-change-color, .header-modal-icon-change-color");

  function applyTheme(theme) {
      if (theme === "dark") {
          document.body.classList.add("dark-theme");
      } else {
          document.body.classList.remove("dark-theme");
      }}

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  buttons.forEach(button => {
      button.addEventListener("click", () => {
          const currentTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
          applyTheme(currentTheme);
          localStorage.setItem("theme", currentTheme);
      });
  });
});
