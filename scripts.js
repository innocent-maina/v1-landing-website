document.addEventListener('click', function(e) {
  const nav = document.querySelector('nav');
  if (window.innerWidth <= 768 && nav.classList.contains('active') && 
      !e.target.closest('nav') && !e.target.closest('.hamburger')) {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
});

document.getElementById('waitlistForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  const messageEl = document.querySelector('.waitlist-message');
 
  messageEl.textContent = 'Thanks for joining! We\'ll notify you when we launch.';
  this.reset();
  
  setTimeout(() => {
    messageEl.textContent = '';
  }, 3000);
});




document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - navHeight,
        behavior: 'smooth'
      });
      
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        document.querySelector('nav').classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    }
  });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px',
  threshold: 0
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', 
          link.getAttribute('href') === `#${activeId}`
        );
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

const scrollReveal = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
};

const scrollObserver = new IntersectionObserver(scrollReveal, {
  threshold: 0.1
});

document.querySelectorAll('.feature-card, .testimonial__card, .pricing__card').forEach(
  element => scrollObserver.observe(element)
);  

