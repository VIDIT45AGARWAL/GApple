import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const cartItem = () => {

    const {cart, updateQuantity, removeFromCart, getTotalItems, getTotalPrice} = useCart()

    console.log('Cart data:', cart)
    console.log('Cart items:', cart?.items)

    if (!cart || cart.items.length === 0 || !cart.items) {
        return (
            <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-gray-600 mb-4">Cart is Empty</h2>
            </div>
        )
    }

    const deliveryFee = getTotalItems()>0? 2 : 0
    const totalPrice = getTotalPrice() + deliveryFee


  return (
    <>
        <div className='grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-4 w-full px-4 sm:px-8 md:px-12 lg:px-24 mt-8 sm:mt-12 md:mt-16 lg:mt-22'>
            <div className='hidden sm:block col-span-1 font-bold text-lime-700'>Items</div>
            <div className='hidden sm:block col-span-1 font-bold text-lime-700'>Title</div>
            <div className='hidden sm:block col-span-1 font-bold text-lime-700 text-center'>Price</div>
            <div className='hidden sm:block col-span-1 font-bold text-lime-700 text-center'>Quantity</div>
            <div className='hidden sm:block col-span-1 font-bold text-lime-700 text-center'>Total</div>
            <div className='hidden sm:block col-span-1 font-bold text-lime-700 text-center'>Remove</div>

            <hr className='col-span-full border-t border-gray-200 my-2'/>

            {cart.items.map((item)=>{
                console.log('Processing cart item: ', item)

                if (!item.name || !item.price || item.quantity == null) {
                        console.warn('Invalid cart item:', item)
                        return null
                    }

                console.log('Item food exists')

                const imageUrl = item.image && (item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`)


                return(
                    <>
                        <div className='col-span-1 sm:col-span-1 flex sm:block items-center gap-2 justify-center sm:justify-start'>
                            <span className='sm:hidden font-medium text-lime-700'>Item: </span>
                            <img src={imageUrl} className='rounded-lg size-15 lg:size-24'/>
                        </div>
                        <div className='col-span-1 sm:col-span-1 flex items-center justify-center sm:justify-start'>
                            <span className='sm:hidden font-medium text-lime-700 mr-2'>Title: </span>
                            <span>{item.name}</span>
                        </div>
                        <div className='col-span-1 sm:col-span-1 flex items-center justify-center'>
                            <span className='sm:hidden font-medium text-lime-700 mr-2'>Price: </span>
                            <span>${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                        <div className='col-span-1 sm:col-span-1 flex items-center justify-center'>
                            <span className='sm:hidden font-medium text-lime-700 mr-2'>Qty: </span>
                            <div className="flex items-center gap-2">
                            <span>{item.quantity}</span>
                            </div>
                        </div>
                        <div className='col-span-1 sm:col-span-1 flex items-center justify-center'>
                            <span className='sm:hidden font-medium text-lime-700 mr-2'>Total: </span>
                            <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className='col-span-1 sm:col-span-1 flex items-center justify-center'>
                            <i className='bx bx-x-circle text-gray-400 text-xl sm:text-2xl lg:text-3xl hover:text-red-500 cursor-pointer' onClick={() => removeFromCart(item.id)}></i>
                        </div>
                        <hr className='col-span-full border-t border-gray-200 my-2'/>
                    </>
                )
            })}

        </div>  

        <div className='flex flex-col px-24 items-center justify-center'>
            <div className='mt-6 md:mt-12 px-4 sm:px-8 md:px-12 lg:px-24'>
                <h1 className='text-xl sm:text-2xl font-bold text-lime-700 pb-3'>Cart Totals</h1>
                <div className='grid grid-cols-2 w-full max-w-xl mx-auto'>

                    <div className='col-span-1 py-2 text-sm sm:text-base'>SubTotal</div>
                    <div className='col-span-1 text-end py-2 text-sm sm:text-base'>${getTotalPrice().toFixed(2)}</div>

                    <hr className='col-span-full border-t border-gray-300 my-1'/>

                    <div className='col-span-1 py-2 text-sm sm:text-base'>Delivery Fee</div>
                    <div className='col-span-1 text-end py-2 text-sm sm:text-base'>${deliveryFee.toFixed(2)}</div>

                    <hr className='col-span-full border-t border-gray-300 my-1'/>

                    <div className='col-span-1 font-bold py-2 text-base sm:text-lg'>Total</div>
                    <div className='col-span-1 text-end font-bold py-2 text-base sm:text-lg'>${totalPrice.toFixed(2)}</div>

                </div>
            </div>

            <Link to='/place-order'>
                <div className='bg-lime-500 p-3 text-white font-bold flex justify-center items-center h-15 rounded-2xl mt-10 cursor-pointer hover:bg-lime-700 text-center '>
                PROCEED TO CHECKOUT
                </div>
            </Link>
        </div>
    </>
  )
}

export default cartItem