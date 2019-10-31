import React from 'react';
import ImageCarousel from './ImageCarousel.jsx';

class ProductImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCarouselOpen: false
    };
    this.openCarousel = this.openCarousel.bind(this);
    this.closeCarousel = this.closeCarousel.bind(this);
  }

  openCarousel() {
    this.setState({isCarouselOpen: !this.state.isCarouselOpen});
  }

  closeCarousel() {
    this.setState({isCarouselOpen: !this.state.isCarouselOpen});
  }

  renderGallery() {
    return this.props.details.images.map((image, i) => {
      return (
        <li 
          key={i} 
          onClick={() => {this.props.changeHeroImage(image.href, i)}} 
          className={i === this.props.focusIndex ? 'gallery-img gallery-active-img' : 'gallery-img'}
        >
          <img src={image.href}></img>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='media-container'>
        <ImageCarousel 
          details={this.props.details}
          openCarousel={this.state.isCarouselOpen}
          closeCarousel={this.closeCarousel}
          changeHeroImage={this.props.changeHeroImage}
          incrementCarouselImage={this.props.incrementCarouselImage}
          decrementCarouselImage={this.props.decrementCarouselImage}
          focusIndex={this.props.focusIndex}
        />
        <div className='hero-container' onClick={() => this.openCarousel()}>
          <img src={this.props.details.hero} />
          <div className='callouts'>
            <span>View Larger</span>
          </div>
        </div>
        <ul className='gallery'>{this.renderGallery()}</ul>
      </div>
    );
  }
}

export default ProductImages;