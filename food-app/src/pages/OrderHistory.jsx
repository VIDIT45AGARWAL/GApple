import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import LoginPopup from '../components/LoginPopup'
import Footer from '../components/Footer'

const OrderHistoryContent = () => {

  const [orders, setOrders]=useState([])
  const [error, setError]=useState(null)
  const [loading, setLoading]=useState(true)
  const {token} =useAuth()

  useEffect(()=>{
    const fetchOrders=async()=>{
      try{
        if(!token){
          throw new Error('No authentication token found, login again')
        }
        const response= await axios.get(`${import.meta.env.VITE_API_BASE_URL}order/user_list/`, {headers:{Authorization: `Token ${token}`}})
        setOrders(response.data)
        setLoading(false)
        console.log(response.data)
      } catch(error){
        console.error('error loading orders', error)
        setLoading(false)
      }
    }

    fetchOrders()
  },[token])


  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='text-lime-600 font-bold text-xl animate-pulse'>
            Loading orders...
          </div>
        </div>
      ) : (
        <div className='flex flex-col mx-12'>
        {orders.map((order)=>{
          return(
            <div className='my-6 bg-white p-4 rounded-2xl shadow-xl'>
              <h1 className='font-bold text-2xl my-3'>
                Order for: {order.firstName} {order.lastName}
              </h1>
              <div className='grid grid-cols-1 sm:grid-cols-2 my-3'>
                <div className='col-span-1'>
                  <span className='text-lime-600 font-bold'>Address:</span> {order.address}
                </div>
                <div className='col-span-1'>
                  <span className='text-lime-600 font-bold'>Email:</span> {order.email}
                </div>
                <div className='col-span-1'>
                  <span className='text-lime-600 font-bold'>PhoneNo:</span> {order.phoneNo}
                </div>
                <div className='col-span-1'>
                  <span className='text-lime-600 font-bold'>PinCode:</span> {order.pincode}
                </div>
      
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 px-2 my-4'>
                {order.items.map(item=>{
                  return(
                    <div className='grid grid-cols-2'>
                      <div className='col-span-1'>{item.food_name}</div>
                      <div className='col-span-1 font-bold text-end pr-16'>x {item.quantity}</div>
                    </div>
                  )
                })}
              </div>
              <div className='font-bold text-lime-500'>
                Total Amount: ${order.total_amount}
              </div>
            </div>
          )  
        })}
      </div>
      )}
    </>
  )
}

const OrderHistory=({login, setLogin})=>{
  return(
    <>
        <div className='flex flex-col min-h-screen'>
            {login? <LoginPopup setLogin={setLogin}/>:<></>}
            <main className='flex-grow'>
            <NavBar setLogin={setLogin}/>
            <OrderHistoryContent/>
            </main>
            <Footer/>
        </div>
    </>
  )
}

export default OrderHistory