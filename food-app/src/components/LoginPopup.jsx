import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const LoginPopup = ({setLogin}) => {

    const [currentState, setCurrentState] =useState("Sign Up")
    const [formData, setFormData]=useState({
      firstName:'',
      lastName:'',
      username:'',
      email:'',
      password:'',
      phone:'',
    })

    const [error, setError]=useState('')
    const [loading, setLoading]=useState(false)
    const {login, register} = useAuth()
    const [showOTPInput, setShowOTPInput]= useState(false)
    const [otp, setOtp]=useState('')
    const [unverifiedEmail, setUnverifiedEmail]=useState('')

    const handleChange=(e)=>{
      const{name, value}=e.target
      setFormData(prev=> ({...prev, [name]: value}))
    }


    const handleSubmit= async (e) =>{
      e.preventDefault()
      setError('')
      setLoading(true)

      try{
        let result
        if(currentState === 'Sign Up'){
          result = await register(formData)

          if(result.needsVerification){
            setShowOTPInput(true)
            setUnverifiedEmail(result.email)
            return
          }
        } else{
          result = await login(formData.email, formData.password)
        }

        if(result.success){
          setLogin(false)
        }
        else{
          setError(result.message || 'An error occurred. Please try again')
        }
      } catch(error){
        console.error(error)
        setError('Error occurred, try again later')
      } finally {
        setLoading(false)
      }
    }

    const handleOTPVerify=async()=>{
      try{
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/verify-email-otp/`, {email:unverifiedEmail, otp:otp})
        if(response.data.success){
          alert('Email verified! Please log in.')
          setShowOTPInput(false)
          setCurrentState('Login')
        } else{
          setError('Invalid OTP or expired')
        }
      } catch(error){ 
        console.error(error)
        setError(error.response?.data?.error || 'OTP verification failed')
      }
    }

  return (
    <>
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
            <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>{currentState}</h2>
                    <i className='bx bx-x-circle text-3xl text-gray-500 hover:text-red-500 cursor-pointer' onClick={()=>setLogin(false)}></i>
                </div>


                {error && (
                  <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg'>
                    {error}
                  </div>
                )}

                <div className='space-y-4 mb-6'>
                    {currentState==='Login'?<></>:
                    <>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <input type="text" name='firstName' placeholder='First Name' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500' value={formData.firstName} onChange={handleChange}/>
                        </div>
                        <div>
                          <input type="text" name='lastName' placeholder='Last Name' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500' value={formData.lastName} onChange={handleChange}/>
                        </div>
                      </div>
                      <input type="text" name='username' placeholder='Username' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500' value={formData.username} onChange={handleChange}/>

                      <input type="tel" name='phone' placeholder='Phone No.' className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500' value={formData.phone} onChange={handleChange}/>
                    </>
                    }
                    <input type="email" name='email' placeholder='Your email' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent' value={formData.email} onChange={handleChange}/>
                    <input type="password" name='password' placeholder='Password' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent' value={formData.password} onChange={handleChange}/>
                </div>
                <button type='submit' className='w-full bg-lime-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-lime-700 transition-colors mb-4'>
                    {currentState==='Sign Up'? 'Create Account':'Login'}
                </button>
                <div className='flex items-center mb-4'>
                    <input type="checkbox" required className='h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded'/>
                    <p className='ml-2 text-sm text-gray-600'>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                <div className='text-center text-sm text-gray-600'>
                    {currentState==='Login'?(
                      <p>Create a new account? <span onClick={()=>{setCurrentState('Sign Up'); setError('')}} className='text-lime-600 font-semibold cursor-pointer hover:underline'>Click here</span></p>
                    ):(
                      <p>Already have an account? <span onClick={()=>{setCurrentState('Login'); setError('')}} className='text-lime-600 font-semibold cursor-pointer hover:underline'>Login here</span></p>
                    )}
                </div>
                
        {showOTPInput && (
          <div className="my-4">
            <input
              type="text"
              placeholder="Enter OTP sent to email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-600 mb-4"
            />
            <button
              type="button"
              onClick={handleOTPVerify}
              className="mt-2 w-full bg-lime-600 text-white py-3 px-4 rounded-lg hover:bg-lime-700"
            >
              Verify Email
            </button>
          </div>
        )}
            </form>
        </div>
    </>
  )
}

export default LoginPopup