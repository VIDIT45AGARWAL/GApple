import React, { useState } from 'react'

const FoodItem = ({dish}) => {

  const [count, setCount] =useState(0)
  const [isAdded, setIsAdded]=useState(false)

  const imageUrl = dish.image.startsWith('http') 
    ? dish.image 
    : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${dish.image}`

  return (
    <>
        <div className='flex flex-col w-70 m-4 shadow-2xl rounded-2xl'>
            <div className='relative'>

              {
                isAdded ? (
                  <div className='bg-white flex flex-row justify-center text-2xl space-x-4 items-center rounded-full absolute right-3 top-60 px-1'>
                    <i className='bx bx-minus-circle text-red-500 cursor-pointer' onClick={()=>{count===1? setIsAdded(false): setCount(prev=>prev-1)}}></i>
                    <span>{count}</span>
                    <i className='bx bx-plus-circle text-green-500 cursor-pointer' onClick={()=>{setCount(prev=>prev+1)}}></i>
                </div>
                ) : (
                  <div className='bg-white text-3xl rounded-full flex justify-center items-center w-8 absolute right-3 top-60 cursor-pointer' onClick={()=>{
                    setCount(1)
                    setIsAdded(true)
                  }}>
                    <i className='bx bx-plus'></i>
                  </div>
                )
              }
                <img src={imageUrl} className='size-70 rounded-t-2xl'/>
            </div>
            <div className='rounded-b-2xl p-3 h-30 relative'>
                <h2 className='font-bold text-2xl'>{dish.name}</h2>
                <h2 className='font-bold absolute bottom-3 left-4 text-lg text-lime-600'>${dish.price.toFixed(2)}</h2>
            </div>
        </div>
    </>
  )
}

export default FoodItem