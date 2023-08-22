import React from 'react';
import { Card, Container, Grid, Text } from '@mantine/core';
import   {Navbar} from '../components/Navbar';
import CardsCarousel from '../components/CardCarousel';
import { } from "react-icons/fa";

const categories = ['Netflix', 'Disney+', 'Amazong Prime', 'Hulu', 'Apple TV+', 'YouTube', 'Paramount+', 'Vudu', 'Max', 'Discovery'];

const data = [
    {
        image: '',
    },
    {

    }
];

function Movies(){
    return(
        <div>
            <Navbar user="Liza T" />
            <img src="https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456" alt="Netflix" />
            <img src="https://assetshuluimcom-a.akamaihd.net/h3o/facebook_share_thumb_default_hulu.jpg" alt="Hulu" />
        </div>
    )
}

