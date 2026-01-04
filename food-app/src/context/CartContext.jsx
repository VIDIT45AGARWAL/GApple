import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const [cart, setCart] = useState(null)
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [updatingItems, setUpdatingItems] = useState({})
  const abortControllerRef = useRef(null)

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null)
      return
    }
    
    setIsCartLoading(true)
    
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    abortControllerRef.current = new AbortController()
    
    try {
      console.log('Fetching cart for user:', user?.email)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}carts/current/`,
        { signal: abortControllerRef.current.signal }
      )
      console.log('Cart fetched successfully:', response.data)
      setCart(response.data)
    } catch (error) {
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        console.log('Request cancelled')
      } else {
        console.error('Failed to fetch cart:', error.response?.data || error.message)
        setCart(null)
      }
    } finally {
      setIsCartLoading(false)
      abortControllerRef.current = null
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('Auth token:', token ? 'Present' : 'Not present')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    }
    
    if (isAuthenticated) {
      fetchCart()
    } else {
      setCart(null)
    }
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [isAuthenticated])

  const addToCart = async (item) => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to add items to cart')
    }
    
    const itemId = `add_${item.id}`
    if (updatingItems[itemId]) {
      throw new Error('Already adding this item to cart')
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }))
    
    try {
      console.log('Adding item to cart:', { food_id: item.id, name: item.name })
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}carts/add_item/`,
        { food_id: item.id, quantity: 1 }
      )
      console.log('Item added successfully:', response.data)
      
      if (cart) {
        const existingItemIndex = cart.items.findIndex(
          cartItem => cartItem.food_id === item.id
        )
        
        if (existingItemIndex >= 0) {
          setCart(prevCart => ({
            ...prevCart,
            items: prevCart.items.map((cartItem, index) => 
              index === existingItemIndex 
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
            total_items: prevCart.total_items + 1,
            total_price: prevCart.total_price + item.price
          }))
        } else {
          setCart(prevCart => ({
            ...prevCart,
            items: [...prevCart.items, {
              id: `temp_${Date.now()}`,
              food_id: item.id,
              name: item.name,
              price: item.price,
              quantity: 1,
              food: item
            }],
            total_items: prevCart.total_items + 1,
            total_price: prevCart.total_price + item.price
          }))
        }
      }
      
      setTimeout(fetchCart, 100)
      
      return response.data
    } catch (error) {
      console.error('Add to cart failed:', error.response?.data || error.message)
      if (cart) {
        setTimeout(fetchCart, 100)
      }
      throw new Error(error.response?.data?.detail || 'Failed to add item to cart')
    } finally {
      setUpdatingItems(prev => {
        const newState = { ...prev }
        delete newState[itemId]
        return newState
      })
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to update the cart')
    }
    
    if (updatingItems[itemId]) {
      throw new Error('This item is already being updated')
    }
    
    if (newQuantity < 0) {
      throw new Error('Quantity cannot be negative')
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }))
    
    try {
      const currentItem = cart?.items.find(item => item.id === itemId)
      if (!currentItem) {
        throw new Error('Item not found in cart')
      }
      
      const oldQuantity = currentItem.quantity
      const quantityChange = newQuantity - oldQuantity
      
      if (cart && quantityChange !== 0) {
        setCart(prevCart => {
          if (newQuantity === 0) {
            return {
              ...prevCart,
              items: prevCart.items.filter(item => item.id !== itemId),
              total_items: prevCart.total_items - oldQuantity,
              total_price: prevCart.total_price - (currentItem.price * oldQuantity)
            }
          } else {
            return {
              ...prevCart,
              items: prevCart.items.map(item =>
                item.id === itemId
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
              total_items: prevCart.total_items + quantityChange,
              total_price: prevCart.total_price + (currentItem.price * quantityChange)
            }
          }
        })
      }
      
      const url = `${import.meta.env.VITE_API_BASE_URL}carts/update_item/${itemId}/`
      console.log('Updating quantity:', { itemId, newQuantity, url })
      
      const response = await axios.post(url, { quantity: newQuantity })
      console.log('Quantity updated successfully:', response.data)
      setTimeout(fetchCart, 100)
      
      return response.data
    } catch (error) {
      console.error('Update quantity failed:', error.response?.data || error.message)
      if (cart) {
        setTimeout(fetchCart, 100)
      }
      
      if (error.response?.status === 404) {
        console.warn('Cart item not found, refreshing cart...')
        await fetchCart()
      }
      
      throw new Error(error.response?.data?.detail || 'Failed to update quantity')
    } finally {
      setUpdatingItems(prev => {
        const newState = { ...prev }
        delete newState[itemId]
        return newState
      })
    }
  }

  const removeFromCart = async (itemId) => {
    return updateQuantity(itemId, 0)
  }

  const clearCart = async () => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to clear cart')
    }
    
    if (isCartLoading) {
      throw new Error('Cart is loading, please try again')
    }
    
    try {
      console.log('Clearing cart')
      setCart(prevCart => ({
        ...prevCart,
        items: [],
        total_items: 0,
        total_price: 0
      }))
      
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}carts/clear/`)
      console.log('Cart cleared successfully')
      
      await fetchCart()
    } catch (error) {
      console.error('Clear cart failed:', error.response?.data || error.message)
      await fetchCart()
      throw new Error(error.response?.data?.detail || 'Failed to clear cart')
    }
  }

  const getTotalItems = () => {
    return cart?.total_items || 0
  }

  const getTotalPrice = () => {
    return cart?.total_price || 0
  }

  const isItemUpdating = (itemId) => {
    return !!updatingItems[itemId]
  }

  const value = {
    cart,
    isCartLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    fetchCart,
    refreshCart: fetchCart,
    isItemUpdating
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)