import React from 'react';

class ProductImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderGallery() {
    return this.props.details.images.map((image, i) => {
      return (
        <li 
          key={i} 
          onClick={() => {this.props.changeHeroImage(image.href, i)}} 
          className={i === this.props.focusIndex ? 'gallery-active-img' : ''}
        >
          <img src={image.href}></img>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='media-container'>
        <div className='hero-container'>
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