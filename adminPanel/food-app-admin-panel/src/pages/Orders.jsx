import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchOrders = async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}order`)
        setOrders(response.data)
        console.log(response.data)
        setLoading(false)
      } catch(error){
        console.error('error loading orders', error)
        setLoading(false)
      }
    }

    fetchOrders()
  },[])

  return (
    <>
       <div>
          <div>hi</div>
       </div>
    </>
  )
}

export default Orders