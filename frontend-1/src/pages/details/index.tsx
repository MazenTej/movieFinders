import React, { useEffect } from 'react';
import './info.css'
import './index.css'
import { useParams } from 'react-router-dom';
import useFetch from '../../context/useFetch';
import { Details } from './components/details';
import CustomComponent from './components/comments';

const Info: React.FC = () => {
   
    return (
        <div className="info">
            <Details />
            <CustomComponent />
        </div>
    )
}

export default Info;
