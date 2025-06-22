import React from 'react'
import {Link} from 'react-router-dom'

const OrderConfirmation = () => {
  return (
    <>
    <div className='text-2xl text-center py-10 font-bold '>WORK IN PROGRESS</div>
    <Link to='/' className='px-4 flex justify-center'>
      <button className='bg-lime-500 p-4 text-white cursor-pointer hover:bg-lime-700 rounded-lg'>
        Continue Shopping
      </button>
    </Link>
    </>
  )
}

export default OrderConfirmation