import { createStyles, rem } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    width: rem(240),
    height: rem(420),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: theme.radius.md,
    background: 'linear-gradient(180deg, #000000 0%, #1C151D 50.52%, #48344B 73.44%, rgba(199, 51, 223, 0.87) 99.99%, rgba(216, 0, 251, 0.87) 100%);', 
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  image: {
    flex: 1,  
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  content: {
    height: rem(100),  // set a consistent height for the content
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',  // center the content vertically
    padding: theme.spacing.md,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(19),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.8,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface MovieCardProps {
  image: string;
  title: string;
  category: string;
  info: string;
  type: string;
}

function MovieCard({ image, title, category,info,type }: MovieCardProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.card}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={classes.content}>
      <span className={classes.category}>{info}</span>
        <span className={classes.category}>{category}</span>
        <h3 className={classes.title}>{title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
