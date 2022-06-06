'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal'); //the 'x' button on the modal

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



////////////////////
const message = document.createElement('div'); //creates a dom elm, stored in var

const header = document.querySelector('.header')
message.classList.add('cookie-message');
message.innerHTML = 'We used cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.insertAdjacentElement('beforeend', message);


document.querySelector('.btn--close-cookie').addEventListener('click', ()=>{
  message.remove();
})

//only adds/works on inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%'
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect(); //the amount of size needed to get to this window, based on curr position

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset, // 200px left to get to elm + already scrolled 300 px
  //   behavior: 'smooth',
  // })
  section1.scrollIntoView({behavior: 'smooth'})
})


// const h1 = document.querySelector('h1');
// const alertH1 = function(e){
//   alert('addEventListener: Great! You are reading the heading :D');
//
//   // h1.removeEventListener('mouseenter', alertH1) //removed the event listener
// };
// h1.addEventListener('mouseenter', alertH1)

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)


// h1.onmouseenter = function(e){
//   alert('addEventListener: Great! You are reading the heading :D');
// }

// h1.addEventListener('mouseenter', function(e){
//   alert('addEventListener: Great! You are reading the heading :D');
// })




// h1.onmouseenter = function(e){
//   alert('addEventListener: Great! You are reading the heading :D');
// }