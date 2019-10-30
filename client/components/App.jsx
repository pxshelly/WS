import React from 'react';
import axios from 'axios';
import ProductImages from './ProductImages.jsx';

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
  }

  getProducts() {
    const regex = /(?<=products\/).*$/gm;
    let id = window.location.pathname.match(regex)[0];
    axios.get(`/api/products/${id}`)
      .then((result) => {
        const { name, priceRange, price, thumbnail, hero, images } = result.data[0];
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
      .catch((error) => console.log(error));
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

  render() {
    return (
      <main>
        <ProductImages 
          details={this.state} 
          changeHeroImage={this.changeHeroImage}
          focusIndex={this.state.focusIndex}
          focusImage={this.state.focusImage}
        />
      </main>
    );
  }
}

export default App;
