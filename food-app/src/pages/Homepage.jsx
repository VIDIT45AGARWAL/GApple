import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import MenuBar from '../components/MenuBar'
import Footer from '../components/Footer'
import LoginPopup from '../components/LoginPopup'

const Homepage = ({login, setLogin}) => {
  return (
    <>
        <div className='flex flex-col min-h-screen'>
          {login? <LoginPopup setLogin={setLogin}/>:<></>}
          <main>
            <NavBar setLogin={setLogin}/>
            <Hero/>
            <MenuBar/>
          </main>
          <Footer/>
        </div>
    </>
  )
}

export default Homepage