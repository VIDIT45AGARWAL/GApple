import React, { useState } from 'react'

const LoginPopup = ({setLogin}) => {

    const [currentState, setCurrentState] =useState("Sign Up")

  return (
    <>
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
            <form className='bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>{currentState}</h2>
                    <i className='bx bx-x-circle text-3xl text-gray-500 hover:text-red-500 cursor-pointer' onClick={()=>setLogin(false)}></i>
                </div>
                <div className='space-y-4 mb-6'>
                    {currentState==='Login'?<></>:<input type="text" placeholder='Your name' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent'/>}
                    <input type="email" placeholder='Your email' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent'/>
                    <input type="password" placeholder='Password' required className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent'/>
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
                        <p>Create a new account? <span onClick={()=>setCurrentState('Sign Up')} className='text-lime-600 font-semibold cursor-pointer hover:underline'>Click here</span></p>
                    ):(
                        <p>Already have an account? <span onClick={()=>setCurrentState('Login')} className='text-lime-600 font-semibold cursor-pointer hover:underline'>Login here</span></p>
                    )}
                </div>
                
            </form>
        </div>
    </>
  )
}

export default LoginPopup