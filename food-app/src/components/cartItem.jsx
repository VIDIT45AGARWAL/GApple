import React from 'react'

const cartItem = () => {
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

            <div className='col-span-1 sm:col-span-1 flex sm:block items-center gap-2 justify-center sm:justify-start'><span className='sm:hidden font-medium text-lime-700'>Item: </span><img src="/dishes/salad/beet-salad.jpg" className='rounded-lg size-15 lg:size-24'/></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center sm:justify-start'><span className='sm:hidden font-medium text-lime-700 mr-2'>Title: </span><span>Beet Salad</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><span className='sm:hidden font-medium text-lime-700 mr-2'>Price: </span><span>$12</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><span className='sm:hidden font-medium text-lime-700 mr-2'>Qty: </span><span>2</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><span className='sm:hidden font-medium text-lime-700 mr-2'>Total: </span><span>$24</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><i className='bx bx-x-circle text-gray-400 text-xl sm:text-2xl lg:text-3xl hover:text-red-500 cursor-pointer'></i></div>

            <hr className='col-span-full border-t border-gray-200 my-2'/>

            <div className='col-span-1 sm:col-span-1 flex sm:block items-center gap-2 justify-center sm:justify-start'><span className='sm:hidden font-medium text-lime-700'>Item: </span><img src="/dishes/salad/beet-salad.jpg" className='rounded-lg size-15 lg:size-24'/></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center sm:justify-start'><span className='sm:hidden font-medium text-lime-700 mr-2'>Title: </span><span>Beet Salad</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><span className='sm:hidden font-medium text-lime-700 mr-2'>Price: </span><span>$12</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><span className='sm:hidden font-medium text-lime-700 mr-2'>Qty: </span><span>2</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><span className='sm:hidden font-medium text-lime-700 mr-2'>Total: </span><span>$24</span></div>
            <div className='col-span-1 sm:col-span-1 flex items-center justify-center'><i className='bx bx-x-circle text-gray-400 text-xl sm:text-2xl lg:text-3xl hover:text-red-500 cursor-pointer'></i></div>

        </div>  

        <div className='flex flex-col px-24 items-center justify-center'>
            <div className='mt-6 md:mt-12 px-4 sm:px-8 md:px-12 lg:px-24'>
                <h1 className='text-xl sm:text-2xl font-bold text-lime-700 pb-3'>Cart Totals</h1>
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

            <div className='bg-lime-500 p-3 text-white font-bold flex justify-center items-center h-15 rounded-2xl mt-10 cursor-pointer hover:bg-lime-700 text-center '>
                PROCEED TO CHECKOUT
            </div>
        </div>
    </>
  )
}

export default cartItem