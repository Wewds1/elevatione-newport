$(document).ready(function(){
    const sliderContainer = document.getElementById('sliderContainer');
    const sliderTrack = document.getElementById('sliderTrack');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    const visibleItems = 3;
    let currentIndex = visibleItems;

    // Use clientWidth to ignore padding/borders (or adjust as needed)
    function setItemWidth() {
        const containerWidth = sliderContainer.clientWidth; // changed from offsetWidth
        const itemWidth = containerWidth / visibleItems;
        document.querySelectorAll('.slider-item').forEach(item => {
            item.style.width = itemWidth + 'px';
        });
        return itemWidth;
    }

    // Set initial item widths
    let itemWidth = setItemWidth();

    // Clone items for infinite effect
    const originalItems = Array.from(sliderTrack.children);
    const totalItems = originalItems.length;
    const cloneCount = visibleItems;

    // Clone the last 'cloneCount' items and prepend them
    for (let i = totalItems - cloneCount; i < totalItems; i++) {
        const clone = originalItems[i].cloneNode(true);
        sliderTrack.insertBefore(clone, sliderTrack.firstChild);
    }

    // Clone the first 'cloneCount' items and append them
    for (let i = 0; i < cloneCount; i++) {
        const clone = originalItems[i].cloneNode(true);
        sliderTrack.appendChild(clone);
    }

    // Set the initial slider position so that the original first slide is visible
    sliderTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Function to update the slider's transform property
    function updateSlider(animate = true) {
        sliderTrack.style.transition = animate ? 'transform 0.3s ease' : 'none';
        sliderTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Next button click event
    next.addEventListener('click', () => {
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
    prev.addEventListener('click', () => {
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
});
