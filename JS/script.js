

let btn = document.querySelector('#more-info');
let arrow = document.querySelector('#arrow');
let contain = document.querySelector('.contain');
let daytime = document.querySelector('.daytime');
let info = document.querySelector('.info');
let quotes = document.querySelector('.quote-box');


btn.addEventListener('click', () => {
  arrow.classList.toggle('rotate')
  daytime.classList.toggle('reduce');
  contain.classList.toggle('reduce2');
  info.classList.toggle('info-open')
  quotes.classList.toggle('hidden');
  if(arrow.classList.contains('rotate')){
    btn.childNodes[0].textContent = 'LESS';
  } else {
    btn.childNodes[0].textContent = 'MORE';
  }
})