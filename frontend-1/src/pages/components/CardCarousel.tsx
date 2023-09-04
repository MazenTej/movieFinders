import React from 'react';
import { Carousel } from '@mantine/carousel';
import { useMantineTheme} from '@mantine/core';
import MovieCard from './MovieCard';
import { styles } from './MovieCardStyling';

interface Movie {
  image: string;
  title: string;
  category: string;
  info: string;
  mediaType: string;
  id: string;
}

interface CardsCarouselProps {
  movies: Movie[];
}

export function CardsCarousel({ movies }: CardsCarouselProps) {
  const theme = useMantineTheme();
  const { classes } = styles();
  
  const slides = movies.map((movie) => (
    <Carousel.Slide key={movie.title}>
      <MovieCard {...movie} classes={classes} />
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
