// Media handling utilities for the social feed

// Image optimization and handling
export const optimizeImage = (src: string, _maxWidth: number = 800): string => {
  // For now, we'll just return the source URL
  // In a production environment, you might want to use a service like Cloudinary or Imgix
  return src;
};

// Check if a URL is an image
export const isImageUrl = (url: string): boolean => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

// Check if a URL is a video
export const isVideoUrl = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

// Extract all media URLs from post body
export const extractMediaUrls = (body: string): string[] => {
  // Extract image URLs
  const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
  const imageMatches: string[] = [];
  let match: RegExpExecArray | null;
  
  while ((match = imageRegex.exec(body)) !== null) {
    if (match[1]) {
      imageMatches.push(match[1]);
    }
  }
  
  // Extract direct URLs that might be images or videos
  const urlRegex = /https?:\/\/[^\s)]+/g;
  const urlMatches: string[] = [];
  
  while ((match = urlRegex.exec(body)) !== null) {
    const url = match[0];
    // Only add if it's not already captured as a markdown image
    if (!imageMatches.includes(url) && (isImageUrl(url) || isVideoUrl(url))) {
      urlMatches.push(url);
    }
  }
  
  return [...imageMatches, ...urlMatches];
};

// Create a responsive image component
export const createResponsiveImage = (src: string, alt: string = '', className: string = ''): string => {
  const optimizedSrc = optimizeImage(src);
  return `<img src="${optimizedSrc}" alt="${alt}" class="${className} responsive-image" loading="lazy" />`;
};

// Create a video element
export const createVideoElement = (src: string, className: string = ''): string => {
  return `
    <video controls class="${className} responsive-video">
      <source src="${src}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;
};

// Render media content based on type
export const renderMediaContent = (url: string, className: string = ''): string => {
  if (isImageUrl(url)) {
    return createResponsiveImage(url, '', className);
  } else if (isVideoUrl(url)) {
    return createVideoElement(url, className);
  }
  // For other media types, return a link
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${className}">Media Link</a>`;
};

// Gallery component for multiple images
export const createImageGallery = (images: string[], className: string = ''): string => {
  if (images.length === 0) return '';
  
  if (images.length === 1 && images[0]) {
    return createResponsiveImage(images[0], '', className);
  }
  
  // For multiple images, create a grid layout
  let galleryHTML = `<div class="image-gallery ${className}">`;
  
  images.forEach((image, index) => {
    if (image) {
      galleryHTML += `
        <div class="gallery-item">
          ${createResponsiveImage(image, `Gallery image ${index + 1}`, 'gallery-image')}
        </div>
      `;
    }
  });
  
  galleryHTML += '</div>';
  
  return galleryHTML;
};

// Media lightbox functionality
export const initMediaLightbox = () => {
  // This would be implemented with JavaScript in the browser
  // For now, we'll just add the necessary CSS classes
  const style = document.createElement('style');
  style.textContent = `
    .responsive-image {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .responsive-video {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
    
    .image-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    
    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 0.5rem;
    }
    
    .gallery-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .gallery-item:hover .gallery-image {
      transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
      .image-gallery {
        grid-template-columns: 1fr 1fr;
      }
      
      .gallery-image {
        height: 150px;
      }
    }
    
    @media (max-width: 480px) {
      .image-gallery {
        grid-template-columns: 1fr;
      }
      
      .gallery-image {
        height: 200px;
      }
    }
  `;
  
  document.head.appendChild(style);
};