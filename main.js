'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('naver--dark');
  }else {
    navbar.classList.remove('naver--dark');
  };
});


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  console.log(event.target);
  const target = event.target;
  const link = target.dataset.link;
  // navbar data-link 부분 외에 다른곳을 클릭해도 아무것도 출력되지 않음 
  if(link == null) {
    return;
  }
  // go to the section when tapping on the navbar menu
  scrollIntoView(link);
});

// Handle click on "Contact Me" buttion on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// 함수 만들어서 사용
function scrollIntoView(selector) {
  const scrollToContact = document.querySelector(selector);
  scrollToContact.scrollIntoView({behavior: "smooth"});
}