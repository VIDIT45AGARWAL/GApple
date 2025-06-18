import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import MenuList from './components/MenuList'
import FoodItem from './components/FoodItem'
import FoodItemContainer from './components/FoodItemContainer'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup'
import CartItem from './components/cartItem'
import PlaceOrder from './components/PlaceOrder'

const App = () => {

  const [login, setLogin] = useState(false)

  return (
    <>
      {/* {login? <LoginPopup setLogin={setLogin}/>:<></>}
      <NavBar setLogin={setLogin}/>
      <Hero/>
      <MenuBar/>
      <Footer/> */}

      {/* <div className='flex flex-col min-h-screen'>
        {login? <LoginPopup setLogin={setLogin}/>:<></>}
        <main className='flex-grow'>
          <NavBar setLogin={setLogin}/>
          <CartItem/>
        </main>
        <Footer/>
      </div> */}

        <div className='flex flex-col min-h-screen'>
          {login? <LoginPopup setLogin={setLogin}/>:<></>}
          <main className='flex-grow'>
            <NavBar setLogin={setLogin}/>
            <PlaceOrder/>
          </main>
          <Footer/>
        </div>
    </>
  )
}

export default App