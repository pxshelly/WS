import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priceRange: {},
      thumbnail: {},
      hero: '',
      images: []
    };
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
          images: images
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <main></main>
    )
  }
}

export default App;
