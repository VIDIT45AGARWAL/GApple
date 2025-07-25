import React from 'react';
import { HashLink } from 'react-router-hash-link';


const Hero = () => {
  return (
    <div className='bg-[url(/premium_photo-1701882459791-49ef309e1957.jpeg)] bg-center bg-no-repeat bg-cover rounded-xl h-[300px] md:h-[400px] lg:h-[600px] relative mx-6'>
      <div className='absolute inset-0 bg-black/20 rounded-xl'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-6 md:px-8 lg:right-3 lg:left-auto lg:transform-none lg:w-[500px] xl:w-[600px] p-3 text-center lg:text-left'>
        <h2 className='font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 sm:p-4'>
          Order Healthy and Fresh Food Any Time
        </h2>
        <p className='text-white font-bold text-base sm:text-lg md:text-xl p-2 sm:p-4 mt-1 sm:mt-3'>
          Best food makes people think of big family dinners. So you may want to position your restaurant as a place to bring the whole family.
        </p>
        <HashLink smooth to='/#Menu'>
          <button className='cursor-pointer mt-2 sm:mt-3 p-2 sm:p-3 md:p-4 bg-white rounded-full text-lime-600 text-lg sm:text-xl font-bold hover:bg-neutral-200 transition-colors mx-auto lg:mx-0'>
            View Menu
          </button>
        </HashLink>
      </div>
    </div>
  );
};

export default Hero;