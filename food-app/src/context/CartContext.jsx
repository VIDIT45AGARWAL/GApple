import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth()
    const [cart, setCart] = useState(null)
    const [isCartLoading, setIsCartLoading] = useState(false)

    const fetchCart = async () => {
        if (!isAuthenticated) return
        setIsCartLoading(true)
        try {
            console.log('Fetching cart for user:', user?.email)
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}carts/current/`)
            console.log('Cart fetched successfully:', response.data)
            setCart(response.data)
        } catch (error) {
            console.error('Failed to fetch cart:', error.response?.data || error.message)
            setCart(null)
        } finally {
            setIsCartLoading(false)
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
    }, [isAuthenticated])

    const addToCart = async (item) => {
        if (!isAuthenticated) {
            throw new Error('You must be logged in to add items to cart')
        }
        if (isCartLoading) {
            throw new Error('Cart is loading, please try again')
        }
        try {
            console.log('Adding item to cart:', { food_id: item.id, name: item.name })
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}carts/add_item/`,
                { food_id: item.id, quantity: 1 }
            )
            console.log('Item added successfully:', response.data)
            await fetchCart()
            return response.data
        } catch (error) {
            console.error('Add to cart failed:', error.response?.data || error.message)
            throw new Error(error.response?.data?.detail || 'Failed to add item to cart')
        }
    }

    const updateQuantity = async (itemId, newQuantity) => {
        if (!isAuthenticated) {
            throw new Error('You must be logged in to update the cart')
        }
        if (isCartLoading) {
            throw new Error('Cart is loading, please try again')
        }
        if (newQuantity < 1) {
            throw new Error('Quantity must be at least 1')
        }
        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}carts/update_item/${itemId}/`
            console.log('Updating quantity:', { itemId, newQuantity, url })
            const response = await axios.post(url, { quantity: newQuantity })
            console.log('Quantity updated successfully:', response.data)
            await fetchCart()
            return response.data
        } catch (error) {
            console.error('Update quantity failed:', error.response?.data || error.message)
            if (error.response?.status === 404) {
                console.warn('Cart item not found, refreshing cart...')
                await fetchCart()
            }
            throw new Error(error.response?.data?.detail || 'Failed to update quantity')
        }
    }

    const removeFromCart = async (itemId) => {
        if (!isAuthenticated) {
            throw new Error('You must be logged in to remove items from the cart')
        }
        if (isCartLoading) {
            throw new Error('Cart is loading, please try again')
        }
        try {
            console.log('Removing item from cart:', { itemId })
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}carts/remove_item/${itemId}/`)
            console.log('Item removed successfully')
            await fetchCart()
        } catch (error) {
            console.error('Remove item failed:', error.response?.data || error.message)
            throw new Error(error.response?.data?.detail || 'Failed to remove item')
        }
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
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}carts/clear/`)
            console.log('Cart cleared successfully')
            await fetchCart()
        } catch (error) {
            console.error('Clear cart failed:', error.response?.data || error.message)
            throw new Error(error.response?.data?.detail || 'Failed to clear cart')
        }
    }

    const getTotalItems = () => {
        return cart?.total_items || 0
    }

    const getTotalPrice = () => {
        return cart?.total_price || 0
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
        refreshCart: fetchCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)