import React from 'react';
import { Carousel } from '@mantine/carousel';
import {  rem } from '@mantine/core';

import MovieCard from './MovieCard';

interface Movie {
  image: string;
  title: string;
  category: string;
  info: string
}

interface MovieCarouselProps {
  data: Movie[];
}

function MovieCarousel({ data }: MovieCarouselProps) {
  const slides = data.map((item, index) => (
    <Carousel.Slide key={index}>
      <MovieCard {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
      slideGap="xl"
      align="start"
    >
      {slides}
    </Carousel>
  );
}

export default MovieCarousel;
