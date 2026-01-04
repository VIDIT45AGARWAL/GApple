import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const FoodItem = ({ dish }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(0);
  const isOperatingRef = useRef(false);

  const getCurrentCartItem = () => {
    if (!cart?.items) return null;
    return cart.items.find((item) => item.food_id === dish.id);
  };

  useEffect(() => {
    const currentItem = getCurrentCartItem();
    setQuantity(currentItem ? currentItem.quantity : 0);
  }, [cart]);

  const imageUrl = dish.image.startsWith('http')
    ? dish.image
    : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${dish.image}`;

  const handleQuantityChange = async (targetQuantity) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    if (cart === null) {
      alert('Cart is still loading, please wait...');
      return;
    }

    if (isOperatingRef.current) return;
    isOperatingRef.current = true;

    const previousQuantity = quantity;

    try {
      setQuantity(targetQuantity > 0 ? targetQuantity : 0);

      const currentItem = getCurrentCartItem();

      if (targetQuantity <= 0) {
        if (currentItem) {
          await removeFromCart(currentItem.id);
        }
      } else if (previousQuantity === 0) {
        await addToCart(dish, targetQuantity);
      } else {
        if (!currentItem) {
          throw new Error('Item disappeared from cart unexpectedly');
        }
        await updateQuantity(currentItem.id, targetQuantity);
      }
    } catch (error) {
      setQuantity(previousQuantity);
      alert(`Failed: ${error.message}`);
      console.error('Cart operation failed:', error);
    } finally {
      isOperatingRef.current = false;
    }
  };

  return (
    <div className="flex flex-col w-70 m-4 shadow-2xl rounded-2xl">
      <div className="relative">
        {quantity > 0 ? (
          <div className="bg-white flex flex-row justify-center text-2xl space-x-4 items-center rounded-full absolute right-3 top-52 px-2 py-1 shadow-lg">
            <i
              className="bx bx-minus-circle text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={() => handleQuantityChange(quantity - 1)}
            ></i>
            <span className="font-semibold w-8 text-center">{quantity}</span>
            <i
              className="bx bx-plus-circle text-green-500 cursor-pointer hover:scale-110 transition"
              onClick={() => handleQuantityChange(quantity + 1)}
            ></i>
          </div>
        ) : (
          <div
            className="bg-white text-3xl rounded-full flex justify-center items-center w-12 h-12 absolute right-3 top-52 cursor-pointer shadow-lg hover:scale-110 transition"
            onClick={() => handleQuantityChange(1)}
          >
            <i className="bx bx-plus"></i>
          </div>
        )}

        <img src={imageUrl} alt={dish.name} className="size-70 rounded-t-2xl object-cover" />
      </div>

      <div className="rounded-b-2xl p-3 h-30 relative bg-white">
        <h2 className="font-bold text-2xl">{dish.name}</h2>
        <h2 className="font-bold absolute bottom-3 left-4 text-lg text-lime-600">
          ${dish.price.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default FoodItem;