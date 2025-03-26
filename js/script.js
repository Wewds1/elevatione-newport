document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        loop: true, // Enables infinite loop
        autoplay: {
            delay: 5000, // Auto slide every 3 seconds
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1, // Change to show multiple slides
        spaceBetween: 10, // Adjust spacing between slides
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const videoSwiper = new Swiper(".videoSwiper", {
        loop: true,
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 20,
        navigation: {
            nextEl: ".video-next",
            prevEl: ".video-prev",
        },
        pagination: {
            el: ".video-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
        on: {
            init: function () {
                this.update();
                setTimeout(() => {
                    document.querySelectorAll(".videoSwiper video").forEach(video => {
                        video.currentTime = 5;  // Move to 5-second mark
                        video.muted = false;
                        video.pause(); // Ensure all videos are paused at start
                    });
  
                    // Play only the first active slide
                    const firstVideo = document.querySelector(".videoSwiper .swiper-slide-active video");
                    if (firstVideo) {
                        firstVideo.play().catch(err => console.log("Autoplay blocked:", err));
                    }
                }, 500);
            },
            slideChangeTransitionStart: function () {
                document.querySelectorAll(".videoSwiper video").forEach(video => {
                    video.pause();
                    video.currentTime = 5; // Reset to the 5-second mark
                });
            },
            slideChangeTransitionEnd: function () {
                setTimeout(() => {
                    const activeVideo = document.querySelector(".videoSwiper .swiper-slide-active video");
                    if (activeVideo) {
                        activeVideo.load();
                        activeVideo.currentTime = 5; // Keep showing a 5-sec preview
                        activeVideo.muted = false;
                        activeVideo.play();
                    }
                }, 300);
            }
        }
    });
  
    // Play the full video from the start when clicked
    document.querySelectorAll(".videoSwiper video").forEach(video => {
        video.addEventListener("click", function () {
            document.querySelectorAll(".videoSwiper video").forEach(v => {
                v.pause();  // Pause all videos before playing the clicked one
                v.currentTime = 5;
            });
  
            this.currentTime = 0; // Start from the beginning
            this.muted = false;
            this.play();
        });
    });
  
    setTimeout(() => {
        videoSwiper.update(); 
    }, 1000);
  });
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
      const toggleButton = item.querySelector(".faq-toggle");
      const answer = item.querySelector(".faq-answer");
  
      toggleButton.addEventListener("click", () => {
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  otherItem.classList.remove("active");
                  otherItem.querySelector("i").classList.replace("fa-chevron-up", "fa-chevron-down");
                  otherItem.querySelector(".faq-answer").style.maxHeight = null;
              }
          });
  
          item.classList.toggle("active");
          const icon = item.querySelector("i");
  
          if (item.classList.contains("active")) {
              icon.classList.replace("fa-chevron-down", "fa-chevron-up");
              answer.style.maxHeight = answer.scrollHeight + "px";
          } else {
              icon.classList.replace("fa-chevron-up", "fa-chevron-down");
              answer.style.maxHeight = null;
          }
      });
  });

document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".myGallerySwiper", {
      slidesPerView: 1, // Shows one gallery per slide
      spaceBetween: 10,
      loop: true, // Enables infinite loop
      autoplay: {
        delay: 3000, // Auto-slide every 3 seconds
        disableOnInteraction: false, // Keeps autoplay after manual interaction
      },
      navigation: {
        nextEl: ".gallery-swiper-button-next",
        prevEl: ".gallery-swiper-button-prev",
      },
      pagination: {
        el: ".gallery-swiper-pagination",
        clickable: true,
      },
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        },
        {
            root: null, // Observes viewport
            threshold: 0.2, // Trigger when 20% of section is visible
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});
