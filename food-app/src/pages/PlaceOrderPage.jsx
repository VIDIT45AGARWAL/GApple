import React from 'react'
import LoginPopup from '../components/LoginPopup'
import NavBar from '../components/NavBar'
import PlaceOrder from '../components/PlaceOrder'
import Footer from '../components/Footer'

const PlaceOrderPage = ({login, setLogin}) => {
  return (
    <>
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

export default PlaceOrderPage