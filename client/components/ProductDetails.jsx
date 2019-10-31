import React from 'react';

function ProductDetails(props) {
  const isObject = obj => {
    return !Array.isArray(obj) && typeof obj === 'object' && !!obj;
  }

  const doAllKeysExist = (baseObj, keyString) => {
    const keys = keyString.split('.');
    for (let i = 0; i < keys.length; i++) {
      if (baseObj[keys[i]] === undefined) {
        return false;
      }

      baseObj = baseObj[keys[i]];
    }
    return true;
  }

  const formatNumberToMoney = (rawAmount, prefix) => {
    const amount = Number(rawAmount);
    if (amount) {
      const sigfigCount = amount % 1 ? 2 : 0;
      return `${prefix}${amount.toFixed(sigfigCount)}`;
    }
    return rawAmount;
  }

  const regularPrice = doAllKeysExist(props, 'info.priceRange.regular') ? props.info.priceRange.regular : '';
  const sellingPrice = doAllKeysExist(props, 'info.priceRange.selling') ? props.info.priceRange.selling : '';

  const regularLowPrice = isObject(regularPrice) ? regularPrice.low : regularPrice;
  const regularHighPrice = isObject(regularPrice) ? regularPrice.high : '';
  const sellingLowPrice = isObject(sellingPrice) ? sellingPrice.low : sellingPrice;
  const sellingHighPrice = isObject(sellingPrice) ? sellingPrice.high : '';

  const regularDisplayPrice = `${formatNumberToMoney(regularLowPrice, '$')}${formatNumberToMoney(regularHighPrice, ' – $')}`;
  const sellingDisplayPrice = `Limited Time Offer ${formatNumberToMoney(sellingLowPrice, '$')}${formatNumberToMoney(sellingHighPrice, ' – $')}`;

  return (
    <div className='details-container'>
      <div className='details'>
        <h1>{props.info.name}</h1>
        <span className={sellingDisplayPrice ? 'sale' : ''}>{regularDisplayPrice}</span>
        <span className='sellingDisplayPrice'>{sellingDisplayPrice}</span>
      </div>
      <button className='add-to-cart-button'>Add To Cart</button>
    </div>
  );
} 

export default ProductDetails;