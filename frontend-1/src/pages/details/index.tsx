import React, { useEffect } from 'react';
import './info.css'
import './index.css'
import { useParams } from 'react-router-dom';
import useFetch from '../../context/useFetch';
import { Details } from './components/details';
import CustomComponent from './components/comments';

const Info: React.FC = () => {
   const {mediaType, id} = useParams();
   if (!mediaType || !id) {
    return null;
} 
    else{
        return (
            <div className="info">
                <Details />
                <CustomComponent movieID={`${mediaType}${id}`} />
            </div>
         );
    }
}

export default Info;
