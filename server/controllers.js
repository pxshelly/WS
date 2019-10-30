const products = require('../dist/products.json');

const getItem = id => {
  return products.groups.filter((product) => {
    return product.id === id;
  });
}

module.exports = { getItem };