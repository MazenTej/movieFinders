import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faCalendar, faComment, faCog, faSignOut } from '@fortawesome/free-solid-svg-icons'

// import * as FaIcons from 'react-icons/fa' 

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <FontAwesomeIcon icon={faHome} />
    },
    {
        title: 'Favorites',
        path: '/faves',
        icon: <FontAwesomeIcon icon={faHeart} />
    },
    {
        title: 'Coming Soon',
        path: '/coming-soon',
        icon: <FontAwesomeIcon icon={faCalendar} />
    },
    {
        title: 'Chats',
        path: '/chats',
        icon: <FontAwesomeIcon icon={faComment} />
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <FontAwesomeIcon icon={faCog} />
    },
    {
        title: 'Log out',
        path: '/logout',
        icon: <FontAwesomeIcon icon={faSignOut}/>
    }
]
