// 스크롤링 
// navbar 의 height 만큼 스크롤링 되면  효과부여
'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {;
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('naver--dark');
  }else {
    navbar.classList.remove('naver--dark');
  };
});
