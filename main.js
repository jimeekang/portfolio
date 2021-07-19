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

  navbarMenu.classList.remove('open');
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  // navbar data-link 부분 외에 다른곳을 클릭해도 아무것도 출력되지 않음 
  if(link == null) {
    return;
  }

  // go to the section when tapping on the navbar menu
  navbarMenu.classList.remove('open');
  
  scrollIntoView(link);
});

// Navbar toggle buttion for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.add('open');
});


// Home description word typing action
const typingArea = document.querySelector('.home_words');

function blink() {  // Cursor blinking
  typingArea.classList.toggle('active');
}
setInterval(blink, 500); // 반복


// home description word change
const words = ["Front-end", "Back-end", "Mobile"];
let i = 0;

function typingEffect() {
  let word = words[i].split("");
  function loopTyping() {
      if (word.length > 0) {
          document.querySelector('.home_words').textContent += word.shift();
      } else {
          deletingEffect(); // 지워야하므로
          return false;
      };
      setTimeout(loopTyping, 400);
  };
  loopTyping();
};

function deletingEffect() {
  let word = words[i].split("");
  function loopDeleting() {
      if (word.length > 0) {
          word.pop();
          // pop()으로 빠지고 남은 array를 string 으로 만듦
          document.querySelector('.home_words').textContent = word.join(""); 
        } else {
          if (words.length > (i + 1)) { // i번째 + 1
              i++;
          } else {
              i = 0;
          };
          typingEffect();
          return false;
      };
      setTimeout(loopDeleting, 150);
  };
  loopDeleting();
};

typingEffect();



// Handle click on "Contact Me" buttion on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});


// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
const ContactMeBtn = document.querySelector('.home__contact');

document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
  ContactMeBtn.style.opacity = 1 - window.scrollY / homeHeight;
});

// contact me button => recover opacity
ContactMeBtn.addEventListener('mouseover', () => {
  ContactMeBtn.style.opacity = 1;
});
// contact me button => remove opacity
ContactMeBtn.addEventListener('mouseleave', () => {
  ContactMeBtn.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUP = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2) {
    arrowUP.classList.add('visible'); 
  }else {
    arrowUP.classList.remove('visible');
  }
});


// skill value animation
const SkillVlueList = document.querySelectorAll('.skill__value');
document.addEventListener('scroll', () => {
  for(let Skillvalue of SkillVlueList) {
    if(window.innerHeight > Skillvalue.getBoundingClientRect().top) {
      Skillvalue.classList.add('show')
      }
    }
});


// Handle click on the "arrow up" button
arrowUP.addEventListener('click', () => {
  scrollIntoView('#home');
});


// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  //Remove selection from the previous item and select the new one
const projectContainer = document.querySelector('.work__projects');
const active = document.querySelector('.categories__btn.selected');
active.classList.remove('selected');
const target = e.target.nodeName == 'BUTTON' ? e.target : e.target.parentNode;
target.classList.add('selected');

projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible'); 
      }else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  },300);
});





// 함수 만들어서 사용
function scrollIntoView(selector) {
  const scrollToContact = document.querySelector(selector);
  scrollToContact.scrollIntoView({behavior: "smooth"});
}

