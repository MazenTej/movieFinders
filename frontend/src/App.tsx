import { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom'
import { MantineProvider, Text } from '@mantine/core';

import { AuthContext } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'
import Home from './routes/home'
import Profile from './routes/profile'
import React from 'react'
import HomePage from "./pages/Home/Home"

function App() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  // NOTE: console log for testing purposes
  console.log('User:', !!currentUser);

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate('/profile')
    }
  }, [currentUser])
    
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <Routes>
      <Route index element={<Home />} />
      <Route path="profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>}
      />
    </Routes>
    </MantineProvider>
  )
}

export default App
