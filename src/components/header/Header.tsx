
import React from 'react'
import Image from 'next/image'
import './header.css'
import NavBar from '../navBar/NavBar'
import logo from '../../images/tedooo.svg'
import myPic from '../../images/myPic.jpeg'
const Header = () => {
  return (
     <header className="header">
      <div className="logoAndSearchDiv">
        <div className="logo">
            <Image src={logo} alt="Logo" width={40} height={50} />
         
        </div>
        <div className="searchBar">
          <input type="text" className="searchInput" placeholder="Search..." />
       
        </div>
      </div>
      <div className="userActions">
             
    <NavBar/>
     <Image src={myPic} alt="Logo" className='pic'  height={40} />
      </div>
    </header>
  )
}

export default Header