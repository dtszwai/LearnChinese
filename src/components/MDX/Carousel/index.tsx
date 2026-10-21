import React from 'react';
import Slider, { type Settings } from 'react-slick';
import './slick.scss';
import './slick-theme.scss';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

type Carousel = {
  settings?: Settings;
  children: string[];
};

const defaultCarouselSettings = {
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

export default ({ settings, children }: Carousel) => {
  const { withBaseUrl } = useBaseUrlUtils();
  const combinedSettings = { ...defaultCarouselSettings, ...settings };

  return (
    <Slider {...combinedSettings}>
      {children.map((photo, id) => (
        <img src={withBaseUrl(photo)} key={id} alt='' />
      ))}
    </Slider>
  );
};
