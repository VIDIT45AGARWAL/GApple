import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import CartItem from '../components/cartItem'
import Footer from '../components/Footer'
import LoginPopup from '../components/LoginPopup'


const CartPage = ({login, setLogin}) => {
  return (
    <>
        <div className='flex flex-col min-h-screen'>
            {login? <LoginPopup setLogin={setLogin}/>:<></>}
            <main className='flex-grow'>
            <NavBar setLogin={setLogin}/>
            <CartItem/>
            </main>
            <Footer/>
        </div>
    </>
  )
}

export default CartPage