import React from 'react'
import LoginPopup from '../components/LoginPopup'
import NavBar from '../components/NavBar'
import PlaceOrder from '../components/PlaceOrder'
import Footer from '../components/Footer'
import OrderConfirmation from '../components/OrderConfirmation'

const OrderPlaced = ({login, setLogin}) => {
  return (
    <>
        <div className='flex flex-col min-h-screen'>
          {login? <LoginPopup setLogin={setLogin}/>:<></>}
          <main className='flex-grow'>
            <NavBar setLogin={setLogin}/>
            <OrderConfirmation/>
          </main>
          <Footer/>
        </div>
    </>
  )
}

export default OrderPlaced