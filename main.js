// Header Toggle
let MenuBtn = document.getElementById('MenuBtn')

MenuBtn.addEventListener('click', function(e){
    document.querySelector('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('fa-xmark')
})

// Typing effect
let typed = new Typed('#auto-Input',{
    strings: ['Front-End Developer!', 'Web Designer', 'Pen-Testing'],
    typeSpeed:90,
    backSpeed:90,
    backDelay:100,
    loop: true,
})

// Contact validation
document.addEventListener('DOMContentLoaded', function () {
const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault(); 

  
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const phone = form.querySelector('input[name="phone"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  
  if (name === '' || email === '' || phone === '' || message === '') {
      alert('Please fill in all fields.');
      return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
  }

  
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (10 digits without spaces or special characters).');
      return;
  }

 
  alert('Your message has been sent successfully!');

  
  form.reset();
});
});