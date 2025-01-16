import React from 'react';
import './VideoComponent.css'; // Importing the CSS file for the component

function VideoComponent() {
  return (
    <div className="video-container">
      <video className="video" autoPlay muted loop>
        <source src="video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Carousel Caption */}
      <div className="carousel-caption">
        Discover the World of Exquisite Fragrances, Where Every Scent Tells a Unique Story and Transforms Moments into Memories.
      </div>
    </div>
  );
}

export default VideoComponent;
