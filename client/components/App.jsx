import React from 'react';
import axios from 'axios';
import ProductImages from './ProductImages.jsx';
import ProductDetails from './ProductDetails.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priceRange: {},
      thumbnail: {},
      hero: '',
      images: [],
      focusIndex: 0,
      focusImage: ''
    };
    this.changeHeroImage = this.changeHeroImage.bind(this);
    this.incrementCarouselImage = this.incrementCarouselImage.bind(this);
    this.decrementCarouselImage = this.decrementCarouselImage.bind(this);
  }

  getProducts() {
    const regex = /(?<=products\/).*$/gm;
    let id = window.location.pathname.match(regex)[0];
    axios.get(`http://localhost:3000/api/products/${id}`)
      .then((result) => {
        const { name, priceRange, price, thumbnail, hero, images } = result.data[0];
        images.unshift(hero);
        this.setState({
          name: name,
          price: price,
          priceRange: priceRange || price,
          thumbnail: thumbnail,
          hero: hero.href,
          images: images,
          focusImage: images[0].href
        });

      })
      .catch((error) => error);
  }

  componentDidMount() {
    this.getProducts();
  }

  changeHeroImage(img, key) {
    this.setState({
      hero: img,
      focusIndex: key,
      focusImage: img
    });
  }

  decrementCarouselImage() {
    if (this.state.focusIndex === 0) {
      this.setState({
        focusIndex: this.state.images.length - 1,
        focusImage: this.state.images[this.state.images.length - 1].href
      });
    } else {
      this.setState({
        focusIndex: this.state.focusIndex - 1,
        focusImage: this.state.images[this.state.focusIndex - 1].href
      });
    }
  }

  incrementCarouselImage() {
    if (this.state.focusIndex === this.state.images.length - 1) {
      this.setState({
        focusIndex: 0,
        focusImage: this.state.images[0].href
      });
    } else {
      this.setState({
        focusIndex: this.state.focusIndex + 1,
        focusImage: this.state.images[this.state.focusIndex + 1].href
      });
    }
  }

  render() {
    return (
      <main>
        <ProductImages 
          details={this.state} 
          changeHeroImage={this.changeHeroImage}
          changeCarouselImage={this.changeCarouselImage}
          incrementCarouselImage={this.incrementCarouselImage}
          decrementCarouselImage={this.decrementCarouselImage}
          focusIndex={this.state.focusIndex}
          focusImage={this.state.focusImage}
        />
        <ProductDetails info={this.state} />
      </main>
    );
  }
}

export default App;
