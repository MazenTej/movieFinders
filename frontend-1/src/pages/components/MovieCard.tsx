interface MovieCardProps {
  image: string;
  title: string;
  category: string;
  mediaType: string;
  id: string;
  classes: {
    card: any,
    image: any,
    content: any,
    title: any,
    category: any
  }
}

function MovieCard({ image, title, category, mediaType, id, classes  }: MovieCardProps) {
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
