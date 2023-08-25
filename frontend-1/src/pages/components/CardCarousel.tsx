import React from 'react';
import { Carousel } from '@mantine/carousel';
import { useMantineTheme, rem } from '@mantine/core';
import MovieCard from './MovieCard';

interface Movie {
  image: string;
  title: string;
  category: string;
  info: string;
}

interface CardsCarouselProps {
  movies: Movie[];
}

export function CardsCarousel({ movies }: CardsCarouselProps) {
  const theme = useMantineTheme();
  
  const slides = movies.map((movie) => (
    <Carousel.Slide key={movie.title}>
      <MovieCard {...movie} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="20%" 
      slideGap="xs"
      align="start"
      slidesToScroll={1}
    >
      {slides}
    </Carousel>
  );
}
