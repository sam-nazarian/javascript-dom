'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal'); //the 'x' button on the modal

const message = document.createElement('div'); //creates a dom elm, stored in var
const header = document.querySelector('.header')
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//this will make a nodeList, is an iterable
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //the button that's used to open the modal

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

message.classList.add('cookie-message');
message.innerHTML = 'We used cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.insertAdjacentElement('beforeend', message);

document.querySelector('.btn--close-cookie').addEventListener('click', ()=>{
  message.remove();
})
////////////////////
//Scroll Button

//only adds/works on inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%'
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect(); //the amount of size needed to get to this window, based on curr position

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset, // 200px left to get to elm + already scrolled 300 px
  //   behavior: 'smooth',
  // })
  section1.scrollIntoView({behavior: 'smooth'})
})

////////////////////
//Page Navigation, making scrolling smooth, using event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  console.log(e.target);
  //matching strategy: since it's a dom, we can get it's classList
  if(e.target.classList.contains('nav__link')){
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  };
})

//Going downwards: child
const h1 = document.querySelector('h1');

// console.log(h1);
//Works no matter how deep highlight is in h1 el (doesn't need to be direct children of h1)
// console.log(h1.querySelectorAll('.highlight'));

// console.log(h1.childNodes);
// console.log(h1.children); //HTMLCollection is a live connection

// console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'red'


//going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement); //same as parentNode, both are nodes


//chooses the closes parent element, get used often for event delegation
h1.closest('.header').style.background = 'var(--gradient-secondary)'

//if curr & closest are same choose the curr one
h1.closest('h1').style.background = 'var(--gradient-primary)'
//querySelector finds children, closest, finds parents

// Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling); //basically in the same parent but have a children,(next children of parent)

// console.log(h1.previousSibling); //gets the nodes, comments, text, & etc, use element to only get html elements
// console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach((el)=>{
  if(el !== h1) el.style.transform = 'scale(0.5)'
})