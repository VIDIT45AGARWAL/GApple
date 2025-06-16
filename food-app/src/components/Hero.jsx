import React from 'react'

const Hero = () => {
  return (
    <>
        {/* <img alt='image' src="/premium_photo-1701882459791-49ef309e1957.jpeg"/> */}
        <div className='bg-[url(/premium_photo-1701882459791-49ef309e1957.jpeg)] bg-center bg-no-repeat mx-30 rounded-xl h-[600px] relative' style={{backgroundSize: '100% auto'}}>
            <div className='absolute right-3 w-[600px] p-3'>
                <h2 className='font-bold text-white text-6xl p-4'>
                    Order Healthy and Fresh Food Any Time
                </h2>
                <p className='text-white font-bold text-xl p-4 mt-3'>
                    Best food makes people think of big family dinners. So you may want to position your restaurant as a place to bring the whole family.
                </p>
                <button className='cursor-pointer ml-2 mt-3 p-4 bg-white rounded-full text-lime-600 text-xl font-bold hover:bg-neutral-200'>
                    View Menu
                </button>
            </div>
            
        </div>
    </>
  )
}

export default Hero