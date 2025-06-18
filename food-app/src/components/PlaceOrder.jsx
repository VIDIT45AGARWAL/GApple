import React from 'react'

const PlaceOrder = () => {
  return (
    <div className='my-8 md:my-12 lg:my-18'>
      <div className='flex flex-col lg:flex-row justify-between gap-8 px-12'>
        <div className='w-full lg:w-1/2'>
          <h1 className='font-bold text-xl sm:text-2xl text-lime-700 mb-4'>Delivery Information</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div className='sm:col-span-1'>
              <input type="text" className='w-full border border-gray-300 focus:outline-lime-500 rounded-xl p-3'placeholder='First Name' required/>
            </div>
            <div className='sm:col-span-1'>
              <input type="text" className='w-full border border-gray-300 focus:outline-lime-500 rounded-xl p-3'placeholder='Last Name' required/>
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <input type="email" className='w-full border border-gray-300 focus:outline-lime-500 rounded-xl p-3'placeholder='Email address' required/>
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <input type="text" className='w-full border border-gray-300 focus:outline-lime-500 rounded-xl p-3'placeholder='Address' required/>
            </div>
            <div className='sm:col-span-1'>
              <input type="text" className='w-full border border-gray-300 focus:outline-lime-500 rounded-xl p-3'placeholder='Pin Code' required/>
            </div>
            <div className='sm:col-span-1'>
              <input type="tel" className='w-full border border-gray-300 focus:outline-lime-500 rounded-xl p-3'placeholder='Phone No.' required/>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-1/2 flex flex-col items-center'>
          <div className='w-full px-0 sm:px-4 md:px-8 lg:px-12 xl:px-24'>
            <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-lime-700 pb-3'>Cart Totals</h1>
            <div className='grid grid-cols-2 w-full max-w-xl mx-auto'>
              <div className='col-span-1 py-2 text-sm sm:text-base'>SubTotal</div>
              <div className='col-span-1 text-end py-2 text-sm sm:text-base'>$48</div>

              <hr className='col-span-full border-t border-gray-300 my-1'/>

              <div className='col-span-1 py-2 text-sm sm:text-base'>Delivery Fee</div>
              <div className='col-span-1 text-end py-2 text-sm sm:text-base'>$2</div>

              <hr className='col-span-full border-t border-gray-300 my-1'/>

              <div className='col-span-1 font-bold py-2 text-base sm:text-lg'>Total</div>
              <div className='col-span-1 text-end font-bold py-2 text-base sm:text-lg'>$50</div>
            </div>
          </div>

          <button className='w-full max-w-xs bg-lime-500 p-3 text-white font-bold rounded-xl mt-6 hover:bg-lime-700 transition-colors'>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder