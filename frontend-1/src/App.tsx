// deno-lint-ignore-file
import { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom'
import { MantineProvider, Text, MantineTheme  } from '@mantine/core';

import { AuthContext } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'
import Home from './routes/Home'
import Profile from './routes/profile'
import React from 'react'
import { HomePage1 } from "./pages/Home/index"
import AuthenticationForm from "./pages/auth/Login" 
import LoginPortal from "./pages/auth/index"
import Info from './pages/details';



function App() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log('User:', !!currentUser);

  // Check if currentUser exists on initial render
  useEffect(() => {
    // if (currentUser) {
    //   navigate('/')
    // }
  }, [currentUser])
    
  return (
    <MantineProvider withNormalizeCSS>
    <Routes>
      <Route index element={<HomePage1 />} />
      <Route path="/:mediaType/:id" element={<Info />} />
      <Route path="login" element={<LoginPortal text='Login to continue'>
        <AuthenticationForm />
      </LoginPortal>
        } />
      <Route path="profile" element={
        <RequireAuth>
          <Profile/>
        </RequireAuth>}
      />
    </Routes>
    </MantineProvider>
  )
}

export default App;
