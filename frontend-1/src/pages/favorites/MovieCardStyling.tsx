import { createStyles, rem } from '@mantine/core';

export const styles = createStyles((theme) => ({
    card: {
      width: rem(240),
      height: rem(420),
      display: 'inline-flex',
      flexDirection: 'column',
      borderRadius: theme.radius.md,
      background: 'linear-gradient(0deg, rgba(120,1,120,1) 1%, rgba(1,0,1,1) 23%)', 
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
      margin: '10px'
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