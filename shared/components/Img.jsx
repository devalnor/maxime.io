/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';


const Img = ({
  def, src, ...restprops
}) => {
  const srcSet = def.map((num) => `${src.split('.').slice(0, -1).join('.')}@${num}x.${src.split('.').pop()} ${num}x`);
  return (
    <div>
      <img src={src} srcSet={srcSet} {...restprops} />
    </div>
  );
};

export default Img;
