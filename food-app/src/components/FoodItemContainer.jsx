import React, { useEffect, useState } from 'react'
import FoodItem from './FoodItem'
import { getFoods } from '../services/Api'

const FoodItemContainer = ({category}) => {

  const [dishes, setDishes] =useState([])
  const [loading, setLoading]= useState(true)

  useEffect(()=>{
    const fetchDishes = async () =>{
      try{
        const response= await getFoods(category)
        setDishes(response.data)
      } catch (error){
        console.error('Error fetching dishes', error)
      } finally{
        setLoading(false)
      }
    }
    fetchDishes()
  },[category])

  if (loading){
    return <div className='flex justify-center items-center h-64'>
              <div className='text-lime-600 font-bold text-xl animate-pulse'>
                Loading dishes...
              </div>
            </div>
  }


  return (
    <>
        <hr className='border-t-6 border-lime-600 rounded-full border-dashed mx-8 sm:mx-32 mt-12'/>
        <h1 className='mx-8 sm:mx-32 my-6 text-3xl font-bold'>Top dishes for you</h1>
        <div className='mx-8 sm:mx-32 flex flex-wrap'>
          {
            category===null?(
              dishes.map((dish)=>{
                return(
                  <FoodItem key={dish.id} dish={dish}/>
                )
              })
            ) : (
              dishes.filter(dish=>dish.category===category).map((dish)=>{
                return(
                  <FoodItem key={dish.id} dish={dish}/>
                )
              })
            )
          }
        </div>
    </>
  )
}

export default FoodItemContainer