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
// console.log(btnCloseModal);
// console.log(btnsOpenModal);

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);



//querySelector & document have same methods as each other
// document.querySelector('.btn--close-modal').
// console.log(document.getElementById('section--1'))

// console.log( document.getElementsByTagName('button') );

// const x = document.getElementsByTagName('button')
// const x = document.getElementsByClassName('btn'); //these keep updating when a change is made to the dom but querySelector & querySelectorAll don't change


//<div class="cookie-message"></div>
const message = document.createElement('div'); //creates a dom elm, stored in var

const header = document.querySelector('.header')
message.classList.add('cookie-message');
// message.textContent = 'We used cookies for improved functionality and analytics.';
message.innerHTML = 'We used cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';


//an elm cannot be at multiple places at the same time, (DOM ELM is unique)
// header.prepend(message);
// header.append(message.cloneNode(true)); //will be child of header but at end
// header.before(message); //will be before header dom
// header.after(message);

// console.log(message);
header.insertAdjacentElement('beforeend', message);

// Creating and inserting elements


document.querySelector('.btn--close-cookie').addEventListener('click', ()=>{
  // message.remove();

  //move up to header,
  message.parentElement.removeChild(message);//removeChild(the name of the child dom to remove)
})

//message is already a style so this works
message.style.backgroundColor = '#37383d';
message.style.width = '120%'


console.log(getComputedStyle(message));

//only adds/works on inline styles
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered')

//same as document.querySelector('html')
// console.log(document.documentElement)

//
// document.documentElement.style.setProperty('--color-primary')