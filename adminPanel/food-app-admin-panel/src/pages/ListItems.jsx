import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListItems = () => {

    const [foodItems, setFoodItems] = useState([])
    const [loading, setLoading] = useState(true)

    const getAuthToken = () => {
        return localStorage.getItem('token') || localStorage.getItem('authToken');
    }

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
            const token = getAuthToken();
            if (!token) {
                console.error('No authentication token found. Please log in.');
                // Optionally redirect to login page
                // window.location.href = '/login';
                return;
            }
            
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}foods/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            setFoodItems(foodItems.filter(item=> item.id !== id))
        } catch (error){
            console.error('Error deleting item:', error)
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Please log in again');
                // Optionally clear token and redirect to login
                localStorage.removeItem('token');
                // window.location.href = '/login';
            }
        }
    }

    const getImageUrl = (image) => {
        if (!image) return '/placeholder-food.png'
        if (image.startsWith('data:image')) {
            return image
        }
        if (image.startsWith('http')) {
            return image
        }
        return `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${image}`
    }

    if(loading) return(
        <div className='flex justify-center items-center h-64'>
          <div className='text-lime-600 font-bold text-xl animate-pulse'>
            Loading...
          </div>
        </div>
    )

  return (
    <>
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-center mb-8'>Items List</h1>

            <div className='grid grid-cols-12 gap-4 mb-4 p-4 bg-gray-200 rounded-lg font-semibold'>
                <div className='col-span-2 text-xs sm:text-lg'>Image</div>
                <div className='col-span-4 text-xs'>Name</div>
                <div className='col-span-2 text-xs'>Category</div>
                <div className='col-span-2 text-xs text-end sm:text-start'>Price</div>
                <div className='col-span-2 text-xs'>Remove</div>
            </div>


            {
                foodItems.length===0 ? (
                    <div className='text-center py-8'>No Items found</div>
                ) : (
                    foodItems.map((item)=>{
                        const imageUrl = getImageUrl(item.image_url)
                        console.log("ITEM IMAGE:", item.image_url)
                        return(
                            <div key={item.id} className='grid grid-cols-12 gap-4 items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-sm'>
                                <div className='col-span-2'>
                                    <img src={imageUrl} className='size-16 rounded' alt={item.name} />
                                </div>

                                <div className='text-xs sm:text-md col-span-4 font-medium'>{item.name}</div>
                                <div className='text-xs sm:text-md col-span-2 text-gray-600 capitalize'>{item.category}</div>
                                <div className='text-xs text-end sm:text-start sm:text-md col-span-2'>${item.price}</div>
                                <div className='text-xs sm:text-md col-span-2'>
                                    <i className='bx bx-x-circle text-gray-600 hover:text-red-600 cursor-pointer text-3xl px-3 py-1' onClick={()=> handleRemove(item.id)}></i>
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