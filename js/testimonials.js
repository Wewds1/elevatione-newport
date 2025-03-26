$(document).ready(function(){
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonials_prev = document.getElementById('testimonials_prev');
    const testimonials_next = document.getElementById('testimonials_next');

    const visibleItems = 3;
    let currentIndex = visibleItems; // Start at the original first slide after the prepended clones

    // Function to calculate and set each slide's width based on container width
    function setItemWidth() {
        const containerWidth = testimonialsContainer.offsetWidth;
        const itemWidth = containerWidth / visibleItems;
        document.querySelectorAll('.slider-item').forEach(item => {
        item.style.width = itemWidth + 'px';
        });
        return itemWidth;
    }

    // Set initial item widths
    let itemWidth = setItemWidth();

    // Clone items for infinite effect
    const originalItems = Array.from(testimonialsTrack.children);
    const totalItems = originalItems.length;
    const cloneCount = visibleItems;

    // Clone the last 'cloneCount' items and prepend them
    for (let i = totalItems - cloneCount; i < totalItems; i++) {
        const clone = originalItems[i].cloneNode(true);
        testimonialsTrack.insertBefore(clone, testimonialsTrack.firstChild);
    }

    // Clone the first 'cloneCount' items and append them
    for (let i = 0; i < cloneCount; i++) {
        const clone = originalItems[i].cloneNode(true);
        testimonialsTrack.appendChild(clone);
    }

    // Set the initial slider position so that the original first slide is visible
    testimonialsTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Function to update the slider's transform property
    function updateSlider(animate = true) {
        testimonialsTrack.style.transition = animate ? 'transform 0.3s ease' : 'none';
        testimonialsTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Next button click event
    testimonials_next.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
        // If we've reached the cloned first items, jump back to the original items without animation
        if (currentIndex === totalItems + cloneCount) {
        setTimeout(() => {
            currentIndex = cloneCount;
            updateSlider(false);
        }, 300);
        }
    });

    // Previous button click event
    testimonials_prev.addEventListener('click', () => {
        currentIndex--;
        updateSlider();
        // If we've reached the cloned last items, jump to the original last items without animation
        if (currentIndex === 0) {
        setTimeout(() => {
            currentIndex = totalItems;
            updateSlider(false);
        }, 300);
        }
    });

    // Update slider dimensions on window resize
    window.addEventListener('resize', () => {
        itemWidth = setItemWidth();
        updateSlider(false);
    });

    document.querySelectorAll('#testimonials video').forEach(video => {
        video.currentTime = 6;

        video.addEventListener('mouseenter', () => {
            document.querySelectorAll('#testimonials video').forEach(otherVideo => {
                if (otherVideo !== video) {
                  otherVideo.pause();
                }
            });

            video.play().catch(error => {
                console.error('Error playing video:', error);
            });
            video.muted = false;
        })

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.muted = true;
        })
    })


    // For each play button inside #testimonials, attach an event listener.
  document.querySelectorAll('#testimonials .play-button').forEach(button => {
    button.addEventListener('click', function() {
      // Get the container of the clicked button.
      const videoWrapper = this.parentElement;
      const video = videoWrapper.querySelector('video');

      // Pause all other videos inside #testimonials.
      document.querySelectorAll('#testimonials video').forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
          
          if(otherVideo.parentElement) {
            otherVideo.parentElement.classList.remove('playing');
          }
        }
      });

      // Play the current video and add a playing class.
      if (video) {
        video.play();
        videoWrapper.classList.add('playing');
      }
    });
  });
})