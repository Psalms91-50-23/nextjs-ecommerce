import React from 'react';
import Zoom from 'react-medium-image-zoom';
import { urlFor } from '../lib/client';

const ZoomMe = ({ imgUrl, name }) => {
  return (
    <Zoom>
       <img 
            className="product-image"
            src={urlFor(imgUrl)} 
            alt={name} 
            width={250}
            height={250}
        />
    </Zoom>
  )
}

export default ZoomMe