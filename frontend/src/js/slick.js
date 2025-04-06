document.addEventListener('DOMContentLoaded', function () {
    function initSlider(selector, settings) {
      const slider = document.querySelector(selector);
      if (!slider) return;
  
      const slidesWrapper = slider.querySelector('ul');
      const slides = slider.querySelectorAll('li');
  
      let currentIndex = 0;
      let autoplayInterval;
  
      function applyStyles() {
        const slideWidth = slider.clientWidth / settings.slidesToShow;
        slidesWrapper.style.display = 'flex';
        slidesWrapper.style.transition = 'transform 0.5s ease';
        slidesWrapper.style.width = `${slides.length * slideWidth}px`;
  
        slides.forEach(slide => {
          slide.style.width = `${slideWidth}px`;
        });
      }
  
      function moveSlider() {
        const slideWidth = slider.clientWidth / settings.slidesToShow;
        slidesWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }
  
      function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length - settings.slidesToShow + 1) {
          currentIndex = 0;
        }
        moveSlider();
      }
  
      function startAutoplay() {
        if (settings.autoplay) {
          autoplayInterval = setInterval(nextSlide, settings.autoplaySpeed);
        }
      }
  
      function stopAutoplay() {
        clearInterval(autoplayInterval);
      }
  
      function checkResponsive() {
        const width = window.innerWidth;
        let slidesToShow = settings.slidesToShow;
        settings.responsive.forEach(breakpoint => {
          if (width <= breakpoint.breakpoint) {
            slidesToShow = breakpoint.settings.slidesToShow;
          }
        });
        settings.slidesToShow = slidesToShow;
        applyStyles();
        moveSlider();
      }
  
      window.addEventListener('resize', checkResponsive);
  
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
  
      checkResponsive();
      startAutoplay();
    }
  
    // Init customer logos slider
    initSlider('.customer-logos', {
      slidesToShow: 6,
      autoplay: true,
      autoplaySpeed: 1500,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 4 } },
        { breakpoint: 520, settings: { slidesToShow: 3 } }
      ]
    });
  
    // Init event slider
    initSlider('.event-slider', {
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 520, settings: { slidesToShow: 1 } }
      ]
    });
  
    // Init gallery slider
    initSlider('.gallery-slider', {
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 520, settings: { slidesToShow: 1 } }
      ]
    });
  });
  