
  let currentSlideIndex = 0;

  // Show the initial slide
  showSlide(currentSlideIndex);

  function showSlide(index) {
    const slides = document.querySelectorAll(".slide");

    // Loop to handle slide index overflow
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    // Hide all slides
    slides.forEach(slide => (slide.style.display = "none"));

    // Show the current slide
    slides[currentSlideIndex].style.display = "block";
  }

  function changeSlide(step) {
    currentSlideIndex += step;
    showSlide(currentSlideIndex);
  }

