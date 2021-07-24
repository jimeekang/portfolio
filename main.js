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

// typing effect
function typingEffect() {
  let word = words[i].split(""); 
  function loopTyping() {
      if (word.length > 0) {
          document.querySelector('.home_words').textContent += word.shift(); // string으로 반환
      } else {
          deletingEffect(); // 지워야하므로
          return false;
      };
    setTimeout(loopTyping, 300);
  };
  loopTyping();
};

// deleting effect
function deletingEffect() {
  let word = words[i].split(""); 
  function loopDeleting() {
      if (word.length > 0) {
          word.pop();
          // pop()으로 빠지고 남은 array를 string 으로 만듦
          document.querySelector('.home_words').textContent = word.join(""); 
        } else {
          if (words.length > (i + 1)) { //배열의 길이 > (i + 1) : 단어 루프
              i++;
          } else {
              i = 0; // 첫번째 단어로 돌아감
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
workBtnContainer.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  //Remove selection from the previous item and select the new one
const projectContainer = document.querySelector('.work__projects');
const active = document.querySelector('.categories__btn.selected');
active.classList.remove('selected');
const target = event.target.nodeName == 'BUTTON' ? event.target : event.target.parentNode;
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


// 1. 모든 섹션들과 모든 아이템 요소들를 가져온다
// 2. Intersectionobsever을 이용하여 모든 섹션들을 관잘한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

// 함수 만들어서 사용
function scrollIntoView(selector) {
  const scrollToContact = document.querySelector(selector);
  scrollToContact.scrollIntoView({behavior: "smooth"});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}


const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {  // wheel: 사용자가 스스로 스크롤할때  / scroll: 브라우저에서 자동적으로 스크롤
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  }else if ( Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

