import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const FoodItem = ({dish}) => {

  const {cart, addToCart, updateQuantity, removeFromCart, isCartLoading} = useCart()
  const { isAuthenticated } =useAuth()
  const [Quantity, setQuantity]=useState(0)

  const cartItem = cart?.items.find(item => item.food_id === dish.id)
  const quantity = cartItem ? cartItem.quantity : 0

  useEffect(()=>{
    setQuantity(quantity)
  },[quantity])

  console.log(`${dish.name} quantity`,Quantity)

  const imageUrl = dish.image.startsWith('http') 
    ? dish.image 
    : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${dish.image}`

  const handleAddToCart = async () => {
        console.log('handleAddToCart called, isAuthenticated:', isAuthenticated, 'cart:', cart, 'dish:', dish)
        if (!isAuthenticated) {
            alert('Please login to add item to the cart')
            return
        }
        if (isCartLoading || cart === null) {
            alert('Cart is loading, please try again in a moment')
            return
        }
        try {
            setQuantity(Quantity+1)
            await addToCart(dish)
            console.log('Item added to cart:', dish.name)
        } catch (error) {
            console.error('Add to cart error:', error.message)
            setQuantity(quantity)
        }
    }

    const handleUpdateQuantity = async (newQuantity) => {
        console.log('handleUpdateQuantity called, cartItem:', cartItem, 'newQuantity:', newQuantity)
        if (!isAuthenticated) {
            alert('Please login to update the cart')
            return
        }
        if (isCartLoading || cart === null) {
            alert('Cart is loading, please try again in a moment')
            return
        }
        if (!cartItem && newQuantity > 0) {
            await handleAddToCart()
            return
        }
        if (!cartItem) {
            alert('Item not found in cart')
            return
        }
        try {
            if (newQuantity <= 0) {
                await removeFromCart(cartItem.id)
                console.log('Item removed from cart:', dish.name)
            } else {
                await updateQuantity(cartItem.id, newQuantity)
                console.log('Quantity updated:', { itemId: cartItem.id, newQuantity })
            }
        } catch (error) {
            console.error('Update quantity error:', error.message)
            alert(`Failed to update quantity: ${error.message}`)
        }
    }


  return (
    <>
        <div className='flex flex-col w-70 m-4 shadow-2xl rounded-2xl'>
            <div className='relative'>

                {
                Quantity > 0 ? (
                    <div className='bg-white flex flex-row justify-center text-2xl space-x-4 items-center rounded-full absolute right-3 top-52 px-2 py-1'>
                        <i className='bx bx-minus-circle text-red-500 cursor-pointer' onClick={() => handleUpdateQuantity(quantity - 1)}></i>
                        <span>{Quantity}</span>
                        <i className='bx bx-plus-circle text-green-500 cursor-pointer' onClick={() => handleUpdateQuantity(quantity + 1)}></i>
                    </div>
                ) : (
                    <div className='bg-white text-3xl rounded-full flex justify-center items-center w-10 h-10 absolute right-3 top-52 cursor-pointer' onClick={handleAddToCart}>
                        <i className='bx bx-plus'></i>
                    </div>
                )}
                <img src={imageUrl} className='size-70 rounded-t-2xl'/>
            </div>
            <div className='rounded-b-2xl p-3 h-30 relative'>
                <h2 className='font-bold text-2xl'>{dish.name}</h2>
                <h2 className='font-bold absolute bottom-3 left-4 text-lg text-lime-600'>${dish.price.toFixed(2)}</h2>
            </div>
        </div>
    </>
  )
}

export default FoodItem