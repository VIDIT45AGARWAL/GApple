import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const PlaceOrder = () => {

  const { cart, getTotalItems, getTotalPrice, clearCart, isCartLoading } = useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    pinCode: '',
    phone: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deliveryFee = getTotalItems() > 0 ? 2 : 0
  const subtotal = parseFloat(getTotalPrice()) || 0
  const total = (subtotal + deliveryFee).toFixed(2)

  const validateForm = () => {
    const newErrors = {}
    if(!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if(!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if(!formData.email.trim()){
      newErrors.email = 'Email is required'
    } 
    else if(!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = 'Invalid email address'
    }
    if(!formData.address.trim()) newErrors.address = 'Address is required'
    if(!formData.pinCode.trim()){
      newErrors.pinCode = 'Pin code is required'
    } 
    else if(!/^\d{6}$/.test(formData.pinCode)){
      newErrors.pinCode = 'Pin code must be 6 digits'
    }
    if(!formData.phone.trim()){
      newErrors.phone = 'Phone number is required'
    } 
    else if(!/^\d{10}$/.test(formData.phone)){
      newErrors.phone = 'Phone number must be 10 digits'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }


  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert('Please login to place an order')
      return
    }
    console.log('Cart:', cart, 'Total Items:', getTotalItems());
    if (isCartLoading || !cart || getTotalItems() === 0) {
      alert('Cart is empty or loading, please try again')
      return
    }
    if (!validateForm()) {
      return
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please login again.')
      return
    }

    setIsSubmitting(true)
    try{
      const orderPayload ={
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        pincode: formData.pinCode,
        phoneNo: formData.phone,
        total_amount: parseFloat(total),
      }
      console.log('Order Payload:', orderPayload);
      const orderResponse =await axios.post(`${import.meta.env.VITE_API_BASE_URL}order/`, orderPayload, {headers:{Authorization: `Token ${token}`}})  

      const orderId=orderResponse.data.id

      const stripeResponse=await axios.post(`${import.meta.env.VITE_API_BASE_URL.replace('/api/','/')}create-checkout-session/${orderId}/`,{}, {headers: {Authorization: `Token ${token}`}})

      window.location.href=stripeResponse.data.checkout_url

    } catch (error) {
      console.error('Error during checkout:', error.response?.data || error.message);
      alert('Something went wrong during checkout: ' + JSON.stringify(error.response?.data || error.message));
    } finally{
      setIsSubmitting(false)
    }
  };



  return (
    <div className='my-8 md:my-12 lg:my-18'>
      <div className='flex flex-col lg:flex-row justify-between gap-8 px-12'>
        <div className='w-full lg:w-1/2'>
          <h1 className='font-bold text-xl sm:text-2xl text-lime-700 mb-4'>Delivery Information</h1>
          <form className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div className='sm:col-span-1'>
              <input type="text" name='firstName' className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-lime-500 rounded-xl p-3`} placeholder='First Name' required value={formData.firstName} onChange={handleInputChange}/>
              {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>}
            </div>
            <div className='sm:col-span-1'>
              <input type="text" name='lastName' value={formData.lastName} onChange={handleInputChange} className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-lime-500 rounded-xl p-3`} placeholder='Last Name' required/>
              {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>}
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <input type="email" name='email' value={formData.email} onChange={handleInputChange} className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-lime-500 rounded-xl p-3`} placeholder='Email address' required/>
              {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <input type="text" name='address' value={formData.address} onChange={handleInputChange} className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-lime-500 rounded-xl p-3`} placeholder='Address' required/>
            </div>
            {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address}</p>}
            <div className='sm:col-span-1'>
              <input type="text" name='pinCode' value={formData.pinCode} onChange={handleInputChange} className={`w-full border ${errors.pinCode ? 'border-red-500' : 'border-gray-300'} focus:outline-lime-500 rounded-xl p-3`} placeholder='Pin Code' required/>
            </div>
            {errors.pinCode && <p className='text-red-500 text-sm mt-1'>{errors.pinCode}</p>}
            <div className='sm:col-span-1'>
              <input type="tel" name='phone' value={formData.phone} onChange={handleInputChange} className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-lime-500 rounded-xl p-3`} placeholder='Phone No.' required/>
              {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
            </div>
          </form>
        </div>

        <div className='w-full lg:w-1/2 flex flex-col items-center'>
          <div className='w-full px-0 sm:px-4 md:px-8 lg:px-12 xl:px-24'>
            <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-lime-700 pb-3'>Cart Totals</h1>
            <div className='grid grid-cols-2 w-full max-w-xl mx-auto'>
              <div className='col-span-1 py-2 text-sm sm:text-base'>SubTotal</div>
              <div className='col-span-1 text-end py-2 text-sm sm:text-base'>{subtotal.toFixed(2)}</div>

              <hr className='col-span-full border-t border-gray-300 my-1'/>

              <div className='col-span-1 py-2 text-sm sm:text-base'>Delivery Fee</div>
              <div className='col-span-1 text-end py-2 text-sm sm:text-base'>${deliveryFee.toFixed(2)}</div>

              <hr className='col-span-full border-t border-gray-300 my-1'/>

              <div className='col-span-1 font-bold py-2 text-base sm:text-lg'>Total</div>
              <div className='col-span-1 text-end font-bold py-2 text-base sm:text-lg'>${total}</div>
            </div>
          </div>
          
          <button className='w-full max-w-xs bg-lime-500 p-3 text-white font-bold rounded-xl mt-6 hover:bg-lime-700 transition-colors' onClick={handleCheckout} >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder