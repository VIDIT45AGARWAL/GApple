import React, { useState } from 'react'

const NavBar = ({ onMenuToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen); onMenuToggle(!isMobileMenuOpen)}} className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none" >
              <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
            </button>
            
            <div className="flex items-center">
              <div className="font-bold text-2xl sm:text-3xl cursor-pointer text-lime-600 flex items-center">
                <i className='bx bxs-dish mr-2'></i>
                <span>GApple</span>
              </div>
              <div className="hidden sm:block ml-4 text-sm font-semibold text-gray-500 border-l border-gray-400 pl-4">
                Admin Panel
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full">
              <i className='bx bx-bell text-xl'></i>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 font-medium">
                A
              </div>
              <span className="ml-2 hidden md:inline text-sm font-medium text-gray-700">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar