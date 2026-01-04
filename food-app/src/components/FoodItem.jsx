import React, { useState, useCallback, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const FoodItem = ({ dish }) => {
  const { cart, addToCart, updateQuantity, isCartLoading, isItemUpdating } = useCart()
  const { isAuthenticated } = useAuth()
  const [localLoading, setLocalLoading] = useState(false)
  const [lastClickTime, setLastClickTime] = useState(0)
  
  const cartItem = cart?.items.find(item => item.food_id === dish.id)
  const quantity = cartItem ? cartItem.quantity : 0
  const itemUpdating = cartItem ? isItemUpdating(cartItem.id) : false
  
  const imageUrl = dish.image.startsWith('http')
    ? dish.image
    : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${dish.image}`

  const handleAction = useCallback(async (action, ...args) => {
    const now = Date.now()
    const timeSinceLastClick = now - lastClickTime
    
    if (timeSinceLastClick < 500) {
      console.log('Click too fast, ignoring')
      return
    }
    
    setLastClickTime(now)
    setLocalLoading(true)
    
    try {
      await action(...args)
    } catch (error) {
      console.error('Action failed:', error.message)
    } finally {
      setLocalLoading(false)
    }
  }, [lastClickTime])

  const handleAddToCart = useCallback(async () => {
    if (!isAuthenticated) {
      alert('Please login to add item to the cart')
      return
    }
    
    if (localLoading || isCartLoading) {
      return 
    }
    
    await handleAction(async () => {
      await addToCart(dish)
    })
  }, [isAuthenticated, localLoading, isCartLoading, handleAction, addToCart, dish])

  const handleUpdateQuantity = useCallback(async (newQuantity) => {
    if (!isAuthenticated) {
      alert('Please login to update the cart')
      return
    }
    
    if (localLoading || isCartLoading || itemUpdating) {
      return 
    }
    
    if (!cartItem && newQuantity > 0) {
      await handleAddToCart()
      return
    }
    
    if (!cartItem) {
      console.log('Item not found in cart, might have been recently removed')
      return
    }
    
    await handleAction(async () => {
      await updateQuantity(cartItem.id, newQuantity)
    })
  }, [isAuthenticated, localLoading, isCartLoading, itemUpdating, cartItem, handleAction, updateQuantity, handleAddToCart])

  const isLoading = localLoading || isCartLoading || itemUpdating

  return (
    <div className='flex flex-col w-70 m-4 shadow-2xl rounded-2xl'>
      <div className='relative'>
        {quantity > 0 ? (
          <div className='bg-white flex flex-row justify-center text-2xl space-x-4 items-center rounded-full absolute right-3 top-52 px-2 py-1'>
            <button
              className={`bx bx-minus-circle ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 cursor-pointer'}`}
              onClick={() => !isLoading && handleUpdateQuantity(quantity - 1)}
              disabled={isLoading}
              aria-label="Decrease quantity"
            />
            <span className={`${isLoading ? 'text-gray-400' : ''}`}>
              {isLoading ? '...' : quantity}
            </span>
            <button
              className={`bx bx-plus-circle ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-green-500 cursor-pointer'}`}
              onClick={() => !isLoading && handleUpdateQuantity(quantity + 1)}
              disabled={isLoading}
              aria-label="Increase quantity"
            />
          </div>
        ) : (
          <button
            className={`bg-white text-3xl rounded-full flex justify-center items-center w-10 h-10 absolute right-3 top-52 ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-label="Add to cart"
          >
            <i className='bx bx-plus'></i>
          </button>
        )}
        <img src={imageUrl} className='size-70 rounded-t-2xl' alt={dish.name} />
      </div>
      <div className='rounded-b-2xl p-3 h-30 relative'>
        <h2 className='font-bold text-2xl'>{dish.name}</h2>
        <h2 className='font-bold absolute bottom-3 left-4 text-lg text-lime-600'>
          ${dish.price.toFixed(2)}
        </h2>
      </div>
    </div>
  )
}

export default FoodItem