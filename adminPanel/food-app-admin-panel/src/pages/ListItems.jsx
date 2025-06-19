import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListItems = () => {

    const [foodItems, setFoodItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchFoodItems = async ()=>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}foods/`)
                setFoodItems(response.data)
                setLoading(false)
            } catch (error){
                console.error(error)
                setLoading(false)
            }
        }

        fetchFoodItems()
    },[])

    const handleRemove = async (id)=>{
        try{
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}foods/${id}/`)
            setFoodItems(foodItems.filter(item=> item.id !== id))
        } catch (error){
            console.error(error)
        }
    }

    if(loading) return(<div className='text-center py-8'>Loading... </div>)

  return (
    <>
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-center mb-8'>Items List</h1>

            <div className='grid grid-cols-12 gap-4 mb-4 p-4 bg-gray-200 rounded-lg font-semibold'>
                <div className='col-span-2'>Image</div>
                <div className='col-span-4'>Name</div>
                <div className='col-span-2'>Category</div>
                <div className='col-span-2'>Price</div>
                <div className='col-span-2'>Remove</div>
            </div>


            {
                foodItems.length===0 ? (
                    <div className='text-center py-8'>No Items found</div>
                ) : (
                    foodItems.map((item)=>{
                        const imageUrl = item.image.startsWith('http')
                                ? item.image
                                : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`
                        return(
                            <div key={item.id} className='grid grid-cols-12 gap-4 items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-sm'>
                                <div className='col-span-2'>
                                    <img src={imageUrl} className='size-16 rounded' />
                                </div>

                                <div className='col-span-4 font-medium'>{item.name}</div>
                                <div className='col-span-2 text-gray-600 capitalize'>{item.category}</div>
                                <div className='col-span-2'>${item.price}</div>
                                <div className='col-span-2'>
                                    <i class='bx bx-x-circle text-gray-600 hover:text-red-600 cursor-pointer text-3xl px-3 py-1' onClick={()=> handleRemove(item.id)}></i>
                                </div>
                            </div>
                        )
                        
                    })
                )
            }

        </div>
    </>
  )
}

export default ListItems