document.addEventListener('DOMContentLoaded', function() {
  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allPortfolioItems = document.querySelectorAll('.portfolio-item'); // Renamed this variable
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      allPortfolioItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else {
          if (item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
        
        // Trigger reflow for animation
        setTimeout(() => {
          item.style.opacity = '1';
        }, 50);
      });
    });
  });
  
  // Lightbox Functionality
  const portfolioItemElements = document.querySelectorAll('.portfolio-item'); // Renamed this variable
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxMedia = document.querySelector('.lightbox-media');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxCategory = document.querySelector('.lightbox-category');
  const closeLightbox = document.querySelector('.close-lightbox');
  
  portfolioItemElements.forEach(item => {
    item.addEventListener('click', function() {
      const media = this.querySelector('.portfolio-media');
      const title = this.querySelector('.portfolio-info h3').textContent;
      const category = this.querySelector('.portfolio-info p').textContent;
      
      // Clear previous content
      lightboxMedia.innerHTML = '';
      
      // Check if it's an image or video
      if (media.querySelector('img')) {
        const imgSrc = media.querySelector('img').getAttribute('src');
        lightboxMedia.innerHTML = `<img src="${imgSrc}" alt="${title}">`;
      } else if (media.querySelector('video')) {
        const videoSrc = media.querySelector('video source').getAttribute('src');
        lightboxMedia.innerHTML = `
          <video controls autoplay loop>
            <source src="${videoSrc}" type="video/mp4">
          </video>
        `;
      }
      
      // Set title and category
      lightboxTitle.textContent = title;
      lightboxCategory.textContent = category;
      
      // Show lightbox
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  closeLightbox.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Pause any playing videos
    const videos = lightboxMedia.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
    });
  });
  
  // Close lightbox when clicking outside content
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Pause any playing videos
      const videos = lightboxMedia.querySelectorAll('video');
      videos.forEach(video => {
        video.pause();
      });
    }
  });
  
  // Auto-play videos when they come into view
  const portfolioVideos = document.querySelectorAll('.portfolio-media video');
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.5 });
  
  portfolioVideos.forEach(video => {
    videoObserver.observe(video);
    video.muted = true; // Ensure videos are muted for autoplay
  });
  
  // Masonry Layout Adjustment
  function adjustMasonryLayout() {
    const masonry = document.querySelector('.portfolio-masonry');
    if (window.innerWidth >= 992) {
      // For larger screens, make some items taller
      allPortfolioItems.forEach((item, index) => {
        if (index % 4 === 0 || index % 5 === 0) {
          item.style.gridRowEnd = 'span 2';
        } else {
          item.style.gridRowEnd = '';
        }
      });
    } else {
      // Reset for smaller screens
      allPortfolioItems.forEach(item => {
        item.style.gridRowEnd = '';
      });
    }
  }
  
  // Initial adjustment
  adjustMasonryLayout();
  
  // Adjust on resize
  window.addEventListener('resize', adjustMasonryLayout);
});