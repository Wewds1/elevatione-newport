$(document).ready(function(){
// Create a reusable slider function.
function createSlider(config) {
    const container = document.getElementById(config.containerId);
    const track = document.getElementById(config.trackId);
    const prev = document.getElementById(config.prevId);
    const next = document.getElementById(config.nextId);
    const visibleItems = config.visibleItems || 3;
    const spacing = config.spacing || 0; // in pixels
    let currentIndex = visibleItems;
    let itemWidth;

    // Set item widths based on container width.
    function setItemWidth() {
      const containerWidth = container.offsetWidth;
      // Subtract total spacing between visible items.
      itemWidth = (containerWidth - ((visibleItems - 1) * spacing)) / visibleItems;
      track.querySelectorAll('.slider-item').forEach(item => {
        item.style.width = `${itemWidth}px`;
        item.style.marginRight = spacing + 'px';
      });
      return itemWidth;
    }

    itemWidth = setItemWidth();

    // Clone items for infinite effect.
    const originalItems = Array.from(track.children);
    const totalItems = originalItems.length;
    const cloneCount = visibleItems;
    // Prepend clones of the last 'cloneCount' items.
    for (let i = totalItems - cloneCount; i < totalItems; i++) {
      const clone = originalItems[i].cloneNode(true);
      track.insertBefore(clone, track.firstChild);
    }
    // Append clones of the first 'cloneCount' items.
    for (let i = 0; i < cloneCount; i++) {
      const clone = originalItems[i].cloneNode(true);
      track.appendChild(clone);
    }

    // Set initial position.
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Function to update the slider transform.
    function updateSlider(animate = true) {
      track.style.transition = animate ? 'transform 0.4s ease-in-out' : 'none';
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Advance slider forward.
    function goNext() {
      currentIndex++;
      updateSlider();
      if (currentIndex === totalItems + cloneCount) {
        setTimeout(() => {
          currentIndex = cloneCount;
          updateSlider(false);
        }, 400);
      }
    }

    // Move slider backward.
    function goPrev() {
      currentIndex--;
      updateSlider();
      if (currentIndex === 0) {
        setTimeout(() => {
          currentIndex = totalItems;
          updateSlider(false);
        }, 400);
      }
    }

    next.addEventListener('click', () => {
      goNext();
      resetAutoScroll();
    });
    prev.addEventListener('click', () => {
      goPrev();
      resetAutoScroll();
    });

    // Update slider on window resize.
    window.addEventListener('resize', () => {
      itemWidth = setItemWidth();
      updateSlider(false);
    });

    // Auto-scroll functionality.
    let autoScrollInterval = setInterval(goNext, config.autoScrollInterval || 3000);
    function resetAutoScroll() {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(goNext, config.autoScrollInterval || 3000);
    }
  }

  // Initialize first slider (partners).
  createSlider({
    containerId: 'partnersContainer',
    trackId: 'partnersTrack',
    prevId: 'prev',
    nextId: 'next',
    visibleItems: 3,
    spacing: 8, // Adjust spacing (in pixels)
    autoScrollInterval: 3000
  });

  // Initialize second slider (other).
  createSlider({
    containerId: 'otherContainer',
    trackId: 'otherTrack',
    prevId: 'otherPrev',
    nextId: 'otherNext',
    visibleItems: 3,
    spacing: 8,
    autoScrollInterval: 3000
  });
})