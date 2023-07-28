let slideIndex = 0;
let slides = document.getElementsByClassName("mySlide");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('show');
    slides[i].style.transform = 'translateX(100%)';
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex-1].classList.add('show');
  slides[slideIndex-1].style.transform = 'translateX(0)';
}

showSlides();
setInterval(showSlides, 5000); // Change slide every 5 seconds

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

prev.onclick = function(){
  slideIndex -= 2;
  if(slideIndex < 0){
    slideIndex = slides.length - 1;
  }
  showSlides();
}

next.onclick = function(){
  if(slideIndex >= slides.length){
    slideIndex = 0;
  }
  showSlides();
}
