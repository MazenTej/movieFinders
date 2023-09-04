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
import { HomePage1 } from "./pages/Home/index"
import AuthenticationForm from "./pages/auth/Login" 
import LoginPortal from "./pages/auth/index"
import Info from './pages/details';
import { Navbar } from './pages/components/Navbar';



function App() {
  const { currentUser } = useContext(AuthContext)
  const [userName, setUserName] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    setUserName(currentUser?.displayName || currentUser?.email?.split('@')[0] || '')
  }, [currentUser])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
    
  return (
    <MantineProvider withNormalizeCSS>
         <Navbar user={userName} searchValue={searchValue} onChange={onChange} />
    {
      searchValue!=='' && <div> searching</div>
    }
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
      <Route path="favorites" element={
        <Favorites/>}/>
    </Routes>
    </MantineProvider>
  )
}

export default App;
