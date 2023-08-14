import React from 'react';
import { Card, Container, Grid, Text } from '@mantine/core';
import   {Navbar} from './components/Navbar';
import CardsCarousel from './components/CardCarousel'; // Your CardsCarousel component

const categories = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];
const data = [
    {
      image:
        'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg', // Example movie image link
      title: 'The Shawshank Redemption',
      category: 'Drama',
      info:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    },
    {
        title: "The Godfather",
      image:
      "https://ca-times.brightspotcdn.com/dims4/default/87213b8/2147483647/strip/true/crop/3642x2068+0+0/resize/1200x681!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffd%2F4c%2Fb0bda4ec4a6c8052d2be45199fcf%2Fgettyimages-1195327712.jpg",
      category: 'Crime',
      info:
        'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    },
    {
      image:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', // Example movie image link
      title: 'Inception',
      category: 'Sci-Fi',
      info:
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    },
  ];
  

function App() {
    
  return (
    <div>
        <Navbar user="Mazen Tej" />
     <CardsCarousel data={data}/>
    </div>
  );
}

export default App;
