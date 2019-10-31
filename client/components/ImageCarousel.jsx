import React from 'react';

function ImageCarousel(props) {
  const imageIndicator = () => {
    return props.details.images.map((image, i) => {
      return (
        <div key={i} className='image-indicator-dot-containers'>
          <span className={i === props.focusIndex ? 'dot filled-dot' : 'dot empty-dot'}></span>
        </div>
      );
    });
  };

  if (props.openCarousel) {
    return (
      <div>
        <div className='carousel-modal' onClick={() => props.closeCarousel()}></div>
          <div className='carousel-contents'>
            <img className='exit-icon' onClick={() => props.closeCarousel()} src='https://www.westelm.com/weimgs/rk/images/i/201944/0017/images/common/btn_overlay_close.png?1571064991' />
            <h3>{props.details.name}</h3>
            <div className='scroll-buttons scroll-button-left' onClick={() => {props.decrementCarouselImage()}}>
              <img src='https://www.westelm.com/weimgs/rk/images/i/201943/0086/images/svg/global/we-icon__pagination-arrow--reverse.svg' />
            </div>
            <div className='carousel-hero'>
              <img src={props.details.focusImage} />
            </div>
            <div className='scroll-buttons scroll-button-right' onClick={() => {props.incrementCarouselImage()}}>
              <img src='https://www.westelm.com/weimgs/rk/images/i/201943/0086/images/svg/global/we-icon__pagination-arrow--reverse.svg' />
            </div>
            <div className='image-indicator-container'>{imageIndicator()}</div>
        </div>
    </div>
    )
  } else {
    return null;
  }
}

export default ImageCarousel;