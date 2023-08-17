import React, { useState,useEffect,useRef } from 'react';
import { Paper, Text, Title, Button, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  infoWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: theme.white,
    opacity: 0,
    transform: 'translateY(100%)', 
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },

  infoVisible: {
    opacity: 1,
    transform: 'translateY(0%)',
  },

  showMoreButton: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: theme.spacing.md,
  },
  showButtonVisible: {
    marginBottom: "50px"
  },

  infoVisibleButton: {
    position: 'relative',
    bottom: 'auto',
    zIndex: 1,
  },
}));
interface MovieCardProps {
    image: string;
    title: string;
    category: string;
    info: string;
  }


function MovieCard({ image, title, category, info }: MovieCardProps) {
  const { classes } = useStyles();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const infoRef = useRef(null); 
  const [infoHeight, setInfoHeight] = useState(0);

  useEffect(() => {
    if (infoRef.current) {
      setInfoHeight((infoRef.current as HTMLElement).clientHeight);
    }
  }, [info]);

  return (
    <>
    <Title order={3} className={classes.title}>
        {title}
      </Title>
      <Text className={classes.category} size="xs">
        {category}
      </Text>
    <Paper
    shadow="md"
    p="xl"
    radius="md"
    sx={{ backgroundImage: `url(${image})` }}
    className={classes.card}
  >
    <div>
      <Button
        onClick={toggleShowMore}
        variant="white"
        className={`${classes.showMoreButton} ${showMore ? classes.showButtonVisible : ''}`}
        style={{ marginBottom: showMore ? `${infoHeight}px` : '0' }}
      >
        {showMore ? 'Show Less' : 'Show More'}
      </Button>
      <div
        ref={infoRef}
        className={`${classes.infoWrapper} ${showMore ? classes.infoVisible : ''}`}
      >
        <Text>{info}</Text>
      </div>
    </div>
  </Paper>
  </>
  );
}

export default MovieCard;
