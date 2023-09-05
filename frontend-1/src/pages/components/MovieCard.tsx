import { Button, createStyles, rem } from '@mantine/core';
interface MovieCardProps {
  image: string;
  title: string;
  category: string;
  mediaType: string;
  id: string;
}

const useStyles = createStyles((theme) => (
  {
      card: {
        width: rem(240),
        height: rem(420),
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: theme.radius.md,
        background: 'linear-gradient(0deg, rgba(120,1,120,1) 1%, rgba(1,0,1,1) 23%)', 
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

function MovieCard({ image, title, category, mediaType, id  }: MovieCardProps) {
  const { classes } = useStyles();
  const redirect = () => {
    return window.location.href = `/${mediaType}/${id}}`
  };

  return (
    <div className={classes.card} onClick={redirect}>
      
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={classes.content}>
      <span className={classes.category}></span>
        <span className={classes.category}>{category}</span>
        <h3 className={classes.title}>{title}</h3>
      </div>
    </div>
  );

}

export default MovieCard;
