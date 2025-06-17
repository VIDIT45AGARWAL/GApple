import React from 'react'

const NavBar = ({setLogin}) => {
  return (
    <>
        <nav>
          <div className='flex flex-row justify-between p-5  lg:mx-12 items-center'>
            <div className='font-bold text-3xl sm:text-4xl cursor-pointer text-lime-500'>
              <i class='bx bxs-dish mr-2'></i>
              GApple
            </div>

            <div className='space-x-6 hidden md:block'>
              <a className='text-xl hover:text-gray-900 hover:underline font-bold text-gray-600' href="#">Home</a>
              <a className='text-xl hover:text-gray-900 hover:underline font-bold text-gray-600' href="#">Menu</a>
              <a className='text-xl hover:text-gray-900 hover:underline font-bold text-gray-600' href="#">Contact Us</a>
            </div>

            <div className='space-x-4 sm:space-x-6 flex items-center'>
              <i class='bx bx-search text-3xl sm:text-4xl cursor-pointer'></i>
              <i class='bx bx-cart text-3xl sm:text-4xl cursor-pointer'></i>
              <button className='bg-lime-600 text-white font-bold rounded-lg p-3 text-lg sm:text-xl cursor-pointer hover:bg-lime-800 ' onClick={()=>setLogin(true)}>Sign In</button>
            </div>
          </div>
        </nav>
    </>
  )
}

export default NavBar