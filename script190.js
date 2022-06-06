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

// rgb(255,255,255), is 3 random numbers between 0 & 255

const randomInt = (min,max) => {
  return Math.floor(Math.random() * (max-min + 1) + min)
}
const randomColor = () => {
  return `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
}

//if you use querySelector and there are multiple elements with the same class name, querySelector will only select the first one.
document.querySelector('.nav__link').addEventListener('click', function(e){
  // console.log('LINK');
  this.style.backgroundColor = randomColor();
  // e.stopPropagation() //does not go to parent

  console.log('LINK', e.target, e.currentTarget); //target is where the event was originated
  // console.log(e.currentTarget === this); //true
},false) //get capturing phase, listens as it(event) travels down the dom,
//first event travels down to target, then it bubbles back up

//event happens at document root & then from there the event bubbles up (event happens at all parent elms)
document.querySelector('.nav__links').addEventListener('click', function(e){

  // console.log('LINKs');
  this.style.backgroundColor = randomColor();
  console.log('container', e.target, e.currentTarget);

},false)
//
document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();

  console.log('NAV', e.target, e.currentTarget);
}, false)

