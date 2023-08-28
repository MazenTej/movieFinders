// deno-lint-ignore-file
import { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom'
import { MantineProvider, Text, MantineTheme  } from '@mantine/core';

import { AuthContext } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'
import Home from './routes/Home'
import Profile from './routes/profile'
import Favorites from './pages/favorites/favorites'
import React from 'react'
import HomePage from "./pages/Home/Home"
import AuthenticationForm from "./pages/auth/Login" 
import LoginPortal from "./pages/auth/index"



function App() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log('User:', !!currentUser);

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate('/', {state: {userName: currentUser.email?.substring(0, currentUser.email.indexOf("@"))}})
    }
  }, [currentUser])
    
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS >
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPortal text='Login to continue'>
        <AuthenticationForm />
      </LoginPortal>
        } />
      <Route path="profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>}
      />
      <Route path="favorites" element={
        <Favorites/>}/>
    </Routes>
    </MantineProvider>
  )
}

export default App;
