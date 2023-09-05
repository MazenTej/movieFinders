import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import React from 'react';

function Profile() {
  const { currentUser, signOut } = useContext(AuthContext);

  const profileStyle = {
    background: 'linear-gradient(0deg, rgba(120,1,120,1) 1%, rgba(1,0,1,1) 23%)',
    color: 'white', // Set text color to white
    padding: '20px', // Add padding for better spacing
  };

  const buttonStyle = {
    background: 'white', // Set button background color to black
    color: 'black', // Set button text color to white
    padding: '10px 20px', // Add padding to the button
    border: 'none', // Remove button border
    cursor: 'pointer', // Add a pointer cursor on hover
    
  };

  return (
    <div style={profileStyle}>
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && 'active'}</p>
      <button style={buttonStyle} onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
