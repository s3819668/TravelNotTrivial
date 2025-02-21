import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
`;

const Slides = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  width: 100%;
  flex: 0 0 auto;
  opacity: ${props => (props.active ? 1 : 0)};
  transform: ${props => (props.active ? 'translateX(0)' : 'translateX(-100%)')};
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { image: 'path/to/image1.jpg' },
    { image: 'path/to/image2.jpg' },
    { image: 'path/to/image3.jpg' },
  ];

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <CarouselContainer>
      <Slides>
        {slides.map((slide, index) => (
          <Slide key={index} active={index === currentIndex}>
            <img src={slide.image} alt="Carousel Slide" />
          </Slide>
        ))}
      </Slides>
      <Button onClick={prevSlide}>Previous</Button>
      <Button onClick={nextSlide}>Next</Button>
    </CarouselContainer>
  );
};

export default Carousel;