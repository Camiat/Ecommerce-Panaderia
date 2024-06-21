import React, { useState, useEffect } from 'react';
import './Carrusel.css';

const Carrusel = () => {
  const arrayImg = [
    "https://png.pngtree.com/background/20230610/original/pngtree-various-baked-sweets-picture-image_3021210.jpg",
    "https://png.pngtree.com/background/20230611/original/pngtree-various-types-of-doughnuts-and-some-sweet-pastries-are-on-a-picture-image_3162261.jpg",
    "https://png.pngtree.com/background/20230610/original/pngtree-an-assortment-of-different-pastries-and-breads-has-been-shown-picture-image_3019247.jpg"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const carrouselImagen = () => {
      setIndex((prevIndex) => (prevIndex < arrayImg.length - 1 ? prevIndex + 1 : 0));
    };

    const interval = setInterval(carrouselImagen, 2000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="carrusel-container">
      <img
        src={arrayImg[index]}
        alt="carrusel"
        className="carrusel-image"
      />
    </div>
  );
};

export default Carrusel;
