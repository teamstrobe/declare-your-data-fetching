import React from 'react';

const Price = ({value, unit}) => (
  <span>{unit}{value.toLocaleString('en')}</span>
);

export default ({name, regularPrice, salePrice, image}) => (
  <div style={{ display: 'flex', padding: 20 }}>
    <div style={{ minWidth: 200, width: 200, height: 200, padding: 20, border: '1px solid black' }}>
      {image && <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={name} />}
    </div>
    <div style={{ paddingLeft: 20 }}>
      <h2>{name}</h2>
      {salePrice < regularPrice ?
        <p style={{ paddingTop: 20, opacity: 0.7 }}>
          <strike><Price value={regularPrice} unit="$" /></strike>
          <Price value={salePrice} unit="$" />
        </p>
        :
        <p style={{ paddingTop: 20, opacity: 0.7 }}>
          <Price value={regularPrice} unit="$" />
        </p>
      }
    </div>
  </div>
);
