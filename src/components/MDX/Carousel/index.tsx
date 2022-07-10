import React from 'react';
import Slider from 'react-slick';
import './slick.scss';
import './slick-theme.scss';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Carousel = {
  settings?: {};
  children: [];
};

export default ({ settings, children }: Carousel) => {
  const defaultSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <Slider {...defaultSettings} {...settings}>
      {children.map((photo, id) => (
        <img src={useBaseUrl(photo)} key={id} />
      ))}
    </Slider>
  );
};
