$(document).ready(function(){
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryTrack = document.getElementById('galleryTrack');
    const prev = document.getElementById('galleryPrev');
    const next = document.getElementById('galleryNext');

    const visibleItems = 3;
    let currentIndex = visibleItems; // Start at the original first slide after the prepended clones

    // Function to calculate and set each slide's width based on container width
    function setItemWidth() {
        const containerWidth = galleryContainer.offsetWidth;
        const itemWidth = containerWidth / visibleItems;
        document.querySelectorAll('.slider-item').forEach(item => {
        item.style.width = itemWidth + 'px';
        });
        return itemWidth;
    }

    // Set initial item widths
    let itemWidth = setItemWidth();

    // Clone items for infinite effect
    const originalItems = Array.from(galleryTrack.children);
    const totalItems = originalItems.length;
    const cloneCount = visibleItems;

    // Clone the last 'cloneCount' items and prepend them
    for (let i = totalItems - cloneCount; i < totalItems; i++) {
        const clone = originalItems[i].cloneNode(true);
        galleryTrack.insertBefore(clone, galleryTrack.firstChild);
    }

    // Clone the first 'cloneCount' items and append them
    for (let i = 0; i < cloneCount; i++) {
        const clone = originalItems[i].cloneNode(true);
        galleryTrack.appendChild(clone);
    }

    // Set the initial slider position so that the original first slide is visible
    galleryTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Function to update the slider's transform property
    function updateSlider(animate = true) {
        galleryTrack.style.transition = animate ? 'transform 0.3s ease' : 'none';
        galleryTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
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
})