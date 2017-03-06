import React from 'react';

const Price = ({value, unit}) => (
  <span>{unit}{value.toLocaleString('en')}</span>
);

export default ({name, regularPrice, salePrice, image}) => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: 200, height: 200, padding: 20, border: '1px solid black' }}>
      {image && <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={name} />}
    </div>
    <div style={{ paddingLeft: 20 }}>
      <h1>{name}</h1>
      {salePrice < regularPrice ?
        <p>
          <strike><Price value={regularPrice} unit="$" /></strike>
          <Price value={salePrice} unit="$" />
        </p>
        :
        <p>
          <Price value={regularPrice} unit="$" />
        </p>
      }
    </div>
  </div>
);
