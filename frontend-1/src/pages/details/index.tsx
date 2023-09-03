import React, { useContext, useEffect, useState } from 'react';
import './info.css'
import './index.css'
import { useParams } from 'react-router-dom';
import useFetch from '../../context/useFetch';
import { Details } from './components/details';
import CommentSystem from './components/comments';
import { Navbar } from '../components/Navbar';
import { Button, Container } from '@mantine/core';
import { Modal } from 'react-responsive-modal';
import { Rating } from '@mantine/core';
import { AuthContext } from '../../context/AuthContext';
import { addRating, getUserRating } from './ratingHandlers'


const Info: React.FC = () => {
   const {mediaType, id} = useParams();
   const [value, setValue] = useState(0);
   const { currentUser } = useContext(AuthContext)
   const [userUuid, setUserUuid] = useState('');
   
   
   useEffect(() => {
    // const fetchData = async () => {
    // if(mediaType || id || currentUser) {
    //     //@ts-ignore
    //         const rating = await getUserRating(currentUser.uid, mediaType, id);
    // }
    // }
    if (currentUser?.uid && mediaType) {
        setUserUuid(currentUser.uid);
    }
    console.log(currentUser?.uid)
    // fetchData();

    }, [currentUser])
    

   if (!mediaType || !id) {
    return null;
} 
    else{
        return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Navbar user="Mazen Tej" />
           <Container size={1200} style={{ marginTop: '120%' }}> 
                <div className="info">
                <Details />
                {userUuid
                ? <Rating style={
                    {
                        marginLeft: '20%',
                    }
                }value={value} onChange={()=>{
                    setValue(value);
                    addRating(userUuid, mediaType, id, value);
                }} />
                : 
                <div> login to continru</div>
                }
                
                <CommentSystem movieID={`${mediaType}${id}`} />
            </div>
             </Container> 
        </div>
        <div>
        
        </div>
        </>
         );
    }
}

export default Info;
