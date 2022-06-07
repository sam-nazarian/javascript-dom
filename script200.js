'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal'); //the 'x' button on the modal

// const message = document.createElement('div'); //creates a dom elm, stored in var
const header = document.querySelector('.header')
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//this will make a nodeList, is an iterable
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //the button that's used to open the modal


const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container'); //where it holds the tabs
const tabsContent = document.querySelectorAll('.operations__content'); //where info for each tab is stored

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault(); //to prevent scrolling up when clicking on Modal
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  // removing the hidden class elm
}; //this will be added to btnsOpenModal, this is used to open a person's bank account

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  //add hidden to class, which will hide the modal & overlay
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// message.classList.add('cookie-message');
// message.innerHTML = 'We used cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.insertAdjacentElement('beforeend', message);

// document.querySelector('.btn--close-cookie').addEventListener('click', ()=>{
//   message.remove();
// })

////////////////////
//Scroll Button

//only adds/works on inline styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%'
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';


btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect(); //the amount of size needed to get to this window, based on curr position
  section1.scrollIntoView({behavior: 'smooth'})
})

////////////////////
//Page Navigation, making scrolling smooth, using event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  // console.log(e.target);
  //matching strategy: since it's a dom, we can get it's classList
  if(e.target.classList.contains('nav__link')){
    e.preventDefault();
    const id = e.target.getAttribute('href'); //e.target pointing to where click event came from
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  };
})

//Tabbed component
//using event delegation instead
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')
  if(clicked === null) return; //guard clause

  //remove all active tabs & contents
  tabs.forEach((tab) => {
    tab.classList.remove('operations__tab--active')
  })
  tabsContent.forEach((tabContent) => {
    tabContent.classList.remove('operations__content--active')
  })

  //Activate content & tab
  clicked.classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
});

//Menu fade animation
const handleHover = function(e, opacity){
  const link = e.target;

  if(link.classList.contains('nav__link')){
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img'); //img selects any image, with the img tag(in html)

    sibling.forEach((el) => {
      if(el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

//mouseenter does not bubble
nav.addEventListener('mouseover', (e) => handleHover(e,0.5) )
//does the opposite, beings every links' opacity back to 1
nav.addEventListener('mouseout', (e) => handleHover(e,1) )



//Sticky navigation

//Bad performance scroll event firing off with every scroll
// window.addEventListener('scroll', function(){
//
//   const initialCoords = section1.getBoundingClientRect(); //amount of size needed to get to this winodw
//
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky') //on window obj, not on event
//  else nav.classList.remove('sticky') //on window obj, not on event
//
// });

// const obsCallback = function(entries, observer) {
//   // entries.forEach((entry) => {
//   //   console.log(entry);
//   // })
//   const [entry] = entries;
//   console.log(entry);
// }
// const obsOptions = {
//   root: null,
//   threshold: 0.1, //if at-least 10% of target in viewPort, then run obsCallback func
// }
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height; //normally gets amount of size needed to get to this window,
// however height, refers to its height & will be unchanged.

const stickyNav = function(entries){
  const [entry] = entries; //since there's only 1 threshold we don't need to loop over the entries
  // console.log(entry);

  if(entry.isIntersecting === false) nav.classList.add('sticky'); //if target/header not in window
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: `-${navHeight}px`});
headerObserver.observe(header); //at-least 0% of header needs to be found, then set entry to false


const allSections = document.querySelectorAll('.section');

// REVEAL SECTIONS
const revealSection = function(entries, observer){
//there's only 1 threshold so only one entry
//   const [entry] = entries;

  //going through every IntersectionObserver object, if there's 4 objects seen in the window then go through all of
  // them, bug happened if we just select 1st elm as we need to scroll up & down for the window to apear
  entries.forEach((entry) => {
    if(entry.isIntersecting === false) return;

    // console.log(entry);
    entry.target.classList.remove('section--hidden'); //target is dom of element
    observer.unobserve(entry.target)
  })
  // console.log(entry);
}

const sectionObserver = new IntersectionObserver(revealSection, {root:null, threshold: 0.15}) //section gets revealed when it's 15% visible

//since some people may have JS enabled, then it's better to have "section-hidden" added here
allSections.forEach(function(section){
  sectionObserver.observe(section) //whenever section is in viewport then run revealSection func
  section.classList.add('section--hidden')
});


//LAZY LOADING iMAGES, IMPROVES PERFORMANCE, not just a visual thing
const loadImg = function(entries, observer){
  entries.forEach((entry)=>{
    if(entry.isIntersecting === false) return;

    //Replace src with data-src - replace placeholder with the one we want
    entry.target.src = entry.target.dataset.src;

    //only un-blur when image is loaded, when img loads it emits 'load' event
    entry.target.addEventListener('load', function(){
      entry.target.classList.remove('lazy-img');
    })

    observer.unobserve(entry.target);
  })
}


const imgTargets = document.querySelectorAll('img[data-src]') //select all images which have the property of "data-src"
const imgObserver = new IntersectionObserver(loadImg, {root:null, threshold: 0})//rootMargin: '10px'


imgTargets.forEach((img)=>{
  imgObserver.observe(img);
})


//SLIDER
const slides = document.querySelectorAll('.slide');
// const slider = document.querySelector('.slider');

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

// slider.style.transform = 'scale(0.3)';
// slider.style.overflow = 'visible'

// Set Slides in this order: 0%, 100%, 200%, 300%, 400%
// slides.forEach((slide,idx) => {
//   slide.style.transform = `translateX(${100 * idx}%)`;
// })
const goToSlide = function(currSlide){
  slides.forEach((slide,idx) => {
    slide.style.transform = `translateX(${100 * (idx - currSlide)}%)`;
  })
}

let currSlide = 0;
const maxSlide = slides.length-1;

const nextSlide = function(){
    if(currSlide === maxSlide) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide)
    activateDot(currSlide)
}

const prevSlide = function(){
  if(currSlide === 0) currSlide = maxSlide;
  else currSlide--

  goToSlide(currSlide)
  activateDot(currSlide)
}
goToSlide(0)

//Going to slides using buttons
btnRight.addEventListener('click', nextSlide); //-100%, 0%, 100%, 200%
btnLeft.addEventListener('click', prevSlide);

const dotContainer = document.querySelector('.dots');

const createDots = function(){
  for(let i=0; i<slides.length; i++){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  }
}
createDots();

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach((dot)=> {
    dot.classList.remove('dots__dot--active');
  })

    //same as img[data-src]
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

activateDot(0);

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    // console.log(e.target);
    const { slide } = e.target.dataset; //same as e.target.dataset.slide

    goToSlide(slide)
    activateDot(slide)

  }
})

// Next slide, using keys
document.addEventListener('keydown', function(e){
  // console.log(e);
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'ArrowRight') nextSlide();
})