import React from 'react'
import { FiHome, FiMessageCircle } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import './nav.css'
const Nav = [{ "id": 1, "name": "Home", "url": "/", "icon": <FiHome /> },
{ "id": 2, "name": "Messeging", "url": "/messeging", "icon": <FiMessageCircle /> },
{ "id": 3, "name": "Notification", "url": "/notification", "icon": <IoIosNotificationsOutline /> }]

const NavBar = () => {
    return (
        <div className='nav'>
            {Nav.map((item) => (
                <div key={item.id} className='navItem' >
                    <a href={item.url} className='link'>{item.name}</a>

                    {item.icon}


                </div>
            ))}
        </div>
    );
}

export default NavBar