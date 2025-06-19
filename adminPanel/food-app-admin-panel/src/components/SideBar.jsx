import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {

    const [activeItem, setActiveItem] = useState('List Items')

    const menuItems = [
        { name: 'Add Items', icon: 'bx bxs-plus-circle', path: '/add' },
        { name: 'List Items', icon: 'bx bxs-badge-check', path: '/list' },
        { name: 'Orders', icon: 'bx bxs-receipt', path: '/orders' },
    ]

  return (
    <>
        <div className='flex flex-col w-[300px] border min-h-screen space-y-6 p-6'>
            <div className={`border cursor-pointer p-3 rounded-xl ${activeItem==='Add Items'?'bg-lime-50 border-lime-600 text-lime-600':''}`} onClick={()=>setActiveItem('Add Items')}>
                <i className='bx bxs-plus-circle mr-2'></i>
                Add Items
            </div>

            <div className={`border cursor-pointer p-3 rounded-xl ${activeItem==='List Items'?'bg-lime-50 border-lime-600 text-lime-600':''}`} onClick={()=>setActiveItem('List Items')}>
                <i className='bx bxs-badge-check mr-2'></i>
                List Items
            </div>

            <div className={`border cursor-pointer p-3 rounded-xl ${activeItem==='Orders'?'bg-lime-50 border-lime-600 text-lime-600':''}`} onClick={()=>setActiveItem('Orders')}>
                <i className='bx bxs-badge-check mr-2'></i>
                Orders
            </div>
        </div>
    </>
  )
}

export default SideBar