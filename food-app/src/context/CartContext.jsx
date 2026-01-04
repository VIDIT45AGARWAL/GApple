import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    setIsCartLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}carts/current/`);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error.response?.data || error.message);
      setCart(null);
    } finally {
      setIsCartLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);


  const addToCart = async (item, quantity = 1) => {
    if (!isAuthenticated) throw new Error('You must be logged in to add items to cart');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}carts/add_item/`, {
        food_id: item.id,
        quantity,
      });
      await fetchCart();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to add item to cart');
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (!isAuthenticated) throw new Error('You must be logged in');
    if (newQuantity < 1) throw new Error('Quantity must be at least 1');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}carts/update_item/${itemId}/`,
        { quantity: newQuantity }
      );
      await fetchCart();
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) await fetchCart();
      throw new Error(error.response?.data?.detail || 'Failed to update quantity');
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) throw new Error('You must be logged in');
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}carts/remove_item/${itemId}/`);
      await fetchCart();
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to remove item');
    }
  };

  const getTotalItems = () => cart?.total_items || 0;
  const getTotalPrice = () => cart?.total_price || 0;

  const value = {
    cart,
    isCartLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    fetchCart,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);