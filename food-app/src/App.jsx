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
import { AuthProvider } from './context/AuthContext'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'
import OrderPlaced from './pages/OrderPlaced'

const App = () => {

  const [login, setLogin] = useState(false)

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Homepage login={login} setLogin={setLogin}/>}/>
              <Route path='/cart' element={<CartPage login={login} setLogin={setLogin}/>}/>
              <Route path='/place-order' element={<PlaceOrderPage login={login} setLogin={setLogin}/>}/>
              <Route path='/order-placed' element={<OrderPlaced login={login} setLogin={setLogin}/>}/>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App