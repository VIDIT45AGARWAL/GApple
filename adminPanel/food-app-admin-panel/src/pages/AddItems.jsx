import React, { useState } from 'react'
import axios from 'axios'

const AddItems = () => {
        const [previewImage, setPreviewImage]= useState(null)
        const [isSubmitting, setIsSubmitting] =useState(false)

        const[formData, setFormData] =useState({
            name: '',
            category: 'salad',
            price: '',
            image: null,
        })

        const handleImageChange =(e)=>{
            const file= e.target.files[0]
            if(file){
                setFormData({...formData, image:file})
                const reader = new FileReader()
                reader.onloadend = ()=>{
                    setPreviewImage(reader.result)
                }
                reader.readAsDataURL(file)
            }
        }

        const handleChange = (e)=>{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }

        const handleSubmit = async (e)=>{
            e.preventDefault()
            setIsSubmitting(true)
            console.log({...formData, image: previewImage})

            try{
                const formDataToSend = new FormData()
                formDataToSend.append('name', formData.name)
                formDataToSend.append('category', formData.category)
                formDataToSend.append('price', formData.price.toString())
                formDataToSend.append('image', formData.image)

                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}foods/`, formDataToSend,{
                        headers: {
                            'Content-Type' : 'multipart/form-data',
                        }
                    }
                )

                setFormData({
                    name: '',
                    category: 'salad',
                    price: '',
                    image: null
                })

                setPreviewImage(null)
                e.target.reset()

            } catch(error){
                console.error(error)
            } finally {
                setIsSubmitting(false)
            }
        }


  return (
    <>
        <div className='bg-white p-6 rounded-xl shadow-sm'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>Add New Item</h1>
            <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                    <label htmlFor="image" className='block text-sm font-medium text-gray-700'>Upload Image</label>
                    <input type="file" id='image' onChange={handleImageChange} className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100 file:cursor-pointer' accept='image/*' required/>
                    {
                        previewImage && (
                            <div className='mt-4'>
                                <img src={previewImage} alt="" className='size-32 rounded-lg border border-gray-200'/>
                            </div>
                        )
                    }
                </div>

                <div className='space-y-2'>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Product Name</label>
                    <input type="text" name='name' id='name' value={formData.name} onChange={handleChange} placeholder='Type here' required className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 '/>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <label htmlFor="category" className='block text-sm font-medium text-gray-700'>Product Category</label>
                        <select name="category" id='category' value={formData.category} onChange={handleChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500'>
                            <option value="salad">Salad</option>
                            <option value="rolls">Rolls</option>
                            <option value="pasta">Pasta</option>
                            <option value="noodles">Noodles</option>
                            <option value="desserts">Desserts</option>
                            <option value="sandwiches">Sandwiches</option>
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Product Price</label>
                        <input type="Number" id='price' name='price' placeholder='$20' min="0" value={formData.price} onChange={handleChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500' required/>
                    </div>
                </div>

                <button type='submit' disabled={isSubmitting} className={`w-full md:w-auto px-6 py-2 bg-lime-600 text-white font-medium rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isSubmitting ? (
                    <>
                    <i className='bx bx-loader-alt animate-spin mr-2'></i>
                    Adding...
                    </>
                ) : (
                    'Add Product'
                )}
                </button>
            </form>
        </div>
    </>
  )
}

export default AddItems