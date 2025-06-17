import React, { useState } from 'react'
import MenuList from './MenuList'
import FoodItemContainer from './FoodItemContainer'

const MenuBar = () => {
    const [category, setCategory]= useState(null)

  return (
    <>
        <MenuList category={category} setCategory={setCategory}/>
        <FoodItemContainer category={category}/>
    </>
  )
}

export default MenuBar