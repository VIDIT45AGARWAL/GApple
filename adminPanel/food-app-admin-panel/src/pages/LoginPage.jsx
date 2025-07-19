import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const [formData, setFormData]= useState({
        email:'',
        password:'',
    })

    const [error, setError]=useState(null)
    const [isSubmitting, setIsSubmitting]=useState(false)
    const {setUser, setToken, setIsAuthenticated} = useAuth()
    const navigate=useNavigate()

    const handleChange=(e)=>{
        const {name, value}=e.target
        setFormData(prev=>({...prev, [name]: value}))
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)

        if(!formData.email || !formData.password){
            setError('Please fill in all fields')
            setIsSubmitting(false)
            return
        }

        try{
            const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/login/`, {email:formData.email, password:formData.password})
            const {token , user}=response.data
            localStorage.setItem('token', token)
            setToken(token)
            setUser(user)
            setIsAuthenticated(true)
            navigate('/list')
        } catch(error){
            console.error('Login error: ', error.message)
            setError('Login Failed')
            setIsSubmitting(false)
        }

    }

  return (
    <>
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700/4'>
            <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>Admin Login</h2>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className='space-y-4 mb-6'>
                    <input value={formData.email} onChange={handleChange} type="email" name='email' placeholder='Your email' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent'/>
                    <input value={formData.password} onChange={handleChange} type="password" name='password' placeholder='Password' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent'/>
                </div>
                <button disabled={isSubmitting} type='submit' className='w-full bg-lime-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-lime-700 transition-colors mb-4'>
                    {isSubmitting? 'Logging in...': 'Login'}
                </button>
                <div className='flex items-center mb-4'>
                    <input type="checkbox" required className='h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded'/>
                    <p className='ml-2 text-sm text-gray-600'>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </form>
        </div>
    </>
  )
}

export default LoginPage