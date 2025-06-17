import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import MenuList from './components/MenuList'
import FoodItem from './components/FoodItem'
import FoodItemContainer from './components/FoodItemContainer'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <NavBar/>
      <Hero/>
      <MenuBar/>
      <Footer/>
    </>
  )
}

export default App