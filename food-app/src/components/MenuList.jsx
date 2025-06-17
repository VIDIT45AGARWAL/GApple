import React, { useState } from 'react'

const MenuList = ({category, setCategory}) => {

    const menu_list=[
        {menu_name: 'salad', menu_image:'/menu/salad.jpg'},
        {menu_name: 'rolls', menu_image:'/menu/rolls.jpg'},
        {menu_name: 'pasta', menu_image:'/menu/pasta.jpg'},
        {menu_name: 'desserts', menu_image:'/menu/desserts.jpg'},
        {menu_name: 'noodles', menu_image: '/menu/noodles.jpg'},
        {menu_name: 'Pure Veg', menu_image: '/menu/pureVeg.jpeg'},
        {menu_name: 'sandwiches', menu_image: '/menu/sandwich.jpg'},
    ]

  return (
    <>
        <div className='mt-12 px-12'>
            <div>
                <h1 className='p-3 font-bold text-3xl text-lime-600'>
                    Explore our Menu
                </h1>          
            </div>

            <div className='flex space-x-7 overflow-x-auto w-full max-w-full py-4' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {menu_list.map((menu) => (
                    <div key={menu.id} className='flex-shrink-0 flex flex-col items-center'>
                        <img src={menu.menu_image} className={`border-2 rounded-full size-60 object-cover cursor-pointer ${menu.menu_name===category?'border-8 border-lime-500':'border-2'}`} alt={menu.menu_name} onClick={()=>{category===menu.menu_name?setCategory(null):setCategory(menu.menu_name)}}/>
                        <h1 className='text-lg font-bold text-center whitespace-nowrap mt-3'>{menu.menu_name}</h1>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default MenuList