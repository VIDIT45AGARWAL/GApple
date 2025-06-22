import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideBar = ({isOpen}) => {

  return (
    <>
        <div className={`flex flex-col w-[300px] shadow-2xl min-h-screen space-y-6 p-6 fixed top-16 left-0 bg-white z-20 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
            <Link to='/add' >
                <div className={`border cursor-pointer p-3 rounded-xl`}>
                <i className='bx bxs-plus-circle mr-2'></i>
                Add Items
                </div>
            </Link>
            
            <Link to='/list'>
                <div className={`border cursor-pointer p-3 rounded-xl`}>
                <i className='bx bxs-badge-check mr-2'></i>
                List Items
                </div>
            </Link>
            
            <Link to='orders'>
                <div className={`border cursor-pointer p-3 rounded-xl`}>
                <i className='bx bxs-badge-check mr-2'></i>
                Orders
                </div>
            </Link>
            
        </div>
    </>
  )
}

export default SideBar