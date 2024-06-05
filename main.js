// Header Toggle
let MenuBtn = document.getElementById('MenuBtn')

MenuBtn.addEventListener('click', function(e){
    document.querySelector('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('fa-xmark')
})

// Typing effect
let typed = new Typed('#auto-Input',{
    strings: ['Frontend Developer!', 'Backend Developer!', 'Web Designer!', 'App Developer!'],
    typeSpeed:90,
    backSpeed:90,
    backDelay:100,
    loop: true,
})

// Contact validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
fetch('/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message,
    }),
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('Message sent successfully!');
        form.reset();
    } else {
        alert('Failed to send message.');
    }
})
.catch((error) => {
    console.error('Error:', error);
});
});
});