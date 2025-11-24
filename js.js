// Function to animate the percentage number
function animatePercentage(element, target, duration) {
  const start = 0;
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (target - start) * progress);
    element.textContent = current + '%';
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  update();
}

// First, store the target width in a data attribute before clearing inline styles
document.querySelectorAll('.progress').forEach(bar => {
  const width = bar.style.width;
  bar.setAttribute('data-width', width);
  bar.style.width = '';
  
  const skillItem = bar.closest('.skill-item');
  if (skillItem) {
    const percentageSpan = skillItem.querySelector('.skill-percentage');
    if (percentageSpan) {
      const targetPercentage = percentageSpan.textContent.replace('%', '');
      percentageSpan.setAttribute('data-target', targetPercentage);
      percentageSpan.textContent = '0%';
    }
  }
});

// Intersection Observer for progress bar animation
const observerOptions = {
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const progressBar = entry.target;
      const targetWidth = progressBar.getAttribute('data-width') || progressBar.style.width;
      
      progressBar.classList.add('animated');
      progressBar.style.width = '';
      
      requestAnimationFrame(() => {
        progressBar.style.width = '0%';
        
        setTimeout(() => {
          progressBar.style.transition = 'width 1.2s ease-out';
          progressBar.style.width = targetWidth;
          
          const skillItem = progressBar.closest('.skill-item');
          if (skillItem) {
            const percentageSpan = skillItem.querySelector('.skill-percentage');
            if (percentageSpan) {
              const targetPercentage = parseInt(percentageSpan.getAttribute('data-target'));
              animatePercentage(percentageSpan, targetPercentage, 1200);
            }
          }
        }, 50);
      });
      
      observer.unobserve(progressBar);
    }
  });
}, observerOptions);

document.querySelectorAll('.progress').forEach(bar => {
  observer.observe(bar);
});


// Background image rotation in order
const backgroundImages = [
  './images/image1.webp',
  './images/image2.jpg',
  './images/image3.png',
  './images/image4.png'
  // Add more image paths here in order
];

let currentImageIndex = 0;

function changeBackgroundImage() {
  document.body.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
  
  // Move to next image, loop back to start if at the end
  currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
}

// Change image every 5 seconds
setInterval(changeBackgroundImage, 5000);

// Set initial image
changeBackgroundImage();