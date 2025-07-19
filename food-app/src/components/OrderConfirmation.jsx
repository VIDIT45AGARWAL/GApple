import React from 'react'
import {Link} from 'react-router-dom'

const OrderConfirmation = () => {
  return (
    <>
    <div className='text-center text-6xl font-bold'>
      <i className='bx bx-check-circle text-green-500'></i>
    </div>
    <div className='text-2xl text-center pt-3 pb-10 font-bold text-green-500'>Order Placed Successfully</div>
    <Link to='/' className='px-4 flex justify-center'>
      <button className='bg-lime-500 p-4 text-white cursor-pointer hover:bg-lime-700 rounded-lg'>
        Continue Shopping
      </button>
    </Link>
    </>
  )
}

export default OrderConfirmation