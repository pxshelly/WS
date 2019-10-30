const products = require('../dist/products.json');

const getItemById = id => {
  return products.groups.filter((product) => {
    return product.id === id;
  });
}

module.exports = { getItemById };