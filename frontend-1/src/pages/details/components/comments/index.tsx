import React, { useContext, useEffect } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useState } from 'react'
import './index.css'
import { AuthContext } from '../../../../context/AuthContext'

const CustomComponent = () => {
  const { currentUser } = useContext(AuthContext)
  const [currentUserData, setCurrentUserData] = useState<any | null>(null)
  const [data] = useState([
    {
      userId: '01a',
      comId: '012',
      fullName: 'Riya Negi',
      avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'Hey, Loved your blog! ',
      replies: [
        {
          userId: '02a',
          comId: '013',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Adam Scott',
          avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
          text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
        },
        {
          userId: '01a',
          comId: '014',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Riya Negi',
          avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
          text: 'thanks!😊'
        }
      ]
    },
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I have a doubt about the 4th point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    }
  ])
  useEffect(() => {
    if (currentUser) {
      setCurrentUserData({
        currentUserId: currentUser.uid,
        currentUserImg: currentUser.photoURL,
        currentUserProfile: '',
        currentUserFullName: currentUser.displayName || currentUser.email?.split('@')[0]
      })
      
  }
  }, [currentUser])
  useEffect(() => {
    console.log('Updated currentUserData:', currentUserData);
  }, [currentUserData]);


  const customNoComment = () => (
    <div className='no-com'>No comments wohoooo!</div>
  )

  
    

  
  return (
    <div style={{ width: '100%' }}>
      {
      currentUserData ? (
        <CommentSection
        currentUser={currentUserData}
        hrStyle={{ 
          backgroundColor: '#ff0072',
          border: '0px solid #ff0072' 
        }}
        titleStyle={{ color: '#0000' }}
        
        commentData={data}
        currentData={(data: any) => {
          console.log('curent data', data)
        }}
        logIn={{
          loginLink: '/login',
          signupLink: 'http://localhost:3001/'
        }}
        onSubmitAction={(data: {
          userId: string
          comId: string
          avatarUrl: string
          userProfile?: string
          fullName: string
          text: string
          replies: any
        }) => console.log('check submit, ', data)}
        onDeleteAction={(data: any) => console.log('comment was deleted', data)}
        onReplyAction={(data: {
          userId: string
          parentOfRepliedCommentId: string
          repliedToCommentId: string
          avatarUrl: string
          userProfile?: string
          fullName: string
          text: string
        }) => console.log('check reply, ', data)}
        onEditAction={(data: any) => console.log('check edit', data)}
        customNoComment={() => customNoComment()}
        imgStyle={{ borderRadius: '80%' }}
        customImg='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60'
        inputStyle={{
          color : 'white',
          border: '1px solid rgb(208 208 208)',
          borderRadius: '8px'
        }}
        removeEmoji={true}
        formStyle={{ backgroundColor: '#121212' }}
        submitBtnStyle={{ border: '0px solid black', backgroundColor: '#711df8' }}
        cancelBtnStyle={{
          border: '0px solid gray',
          backgroundColor: '#711df8',
          color: 'white',
          borderRadius: '8px'
          
        }}
       
        overlayStyle={{ color: 'white' }}
        replyInputStyle={{ borderBottom: '1px solid white', color: 'black' }}
      />
      ) :
      <CommentSection
        currentUser={null}
        hrStyle={{ 
          backgroundColor: '#ff0072',
          border: '0px solid #ff0072' 
        }}
        titleStyle={{ color: '#0000' }}
        
        commentData={data}
        currentData={(data: any) => {
          console.log('curent data', data)
        }}
        logIn={{
          loginLink: '/login',
          signupLink: 'http://localhost:3001/'
        }}
       
        imgStyle={{ borderRadius: '80%' }}
        customImg='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60'
        inputStyle={{
          color : 'white',
          border: '1px solid rgb(208 208 208)',
          borderRadius: '8px'
        }}
        removeEmoji={true}
        formStyle={{ backgroundColor: '#121212' }}
       
        overlayStyle={{ color: 'white' }}
        replyInputStyle={{ borderBottom: '1px solid white', color: 'black' }}
      />
      }
      
    
    </div>
  )
}


export default CustomComponent