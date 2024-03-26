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