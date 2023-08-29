import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import {Link} from 'react-router-dom'
import './Dropdown.css'

const DropdownMenu = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="dropdown-menu">
        <Link to='/profile'>Profile</Link>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/' onClick={signOut}>Sign out</Link>
    </div>
  );
};

export default DropdownMenu;