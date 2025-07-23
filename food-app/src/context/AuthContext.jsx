import axios from 'axios'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user, setUser]= useState(null)
    const [loading, setLoading] =useState(true)
    const [token , setToken]= useState(localStorage.getItem('token'))

    useEffect(()=>{
        const fetchUser = async () => {
            if(token){
                try{
                    const response= await axios.get(`${import.meta.env.VITE_API_BASE_URL}auth/user/`, {
                        headers:{
                            Authorization: `Token ${token}`
                        }
                    })
                    setUser(response.data)
                    axios.defaults.headers.common['Authorization'] = `Token ${token}`
                } catch(error){
                    console.error(error)
                    logout()
                }
            }
            setLoading(false)
        }
        fetchUser()
    },[token])


    const login = async (email, password)=>{
        console.log('Sending login request with:', {email, password})
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/login/`, {
                email,
                password
            }, {headers: {Authorization: undefined}})

            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setUser(response.data.user)
            return {success : true}
        } catch(error){
            console.error('Login error', error)
            console.log('Server response', error.response?.data)
            return {success: false, message: error.response?.data?.detail || 'Login failed'}
        }
    }

    
    const register = async (formData) =>{
        try{
            const response= await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/register/`, formData,
                {headers: {Authorization: undefined}}
            )

            if(!response.data.user.is_email_verified){
                return{
                    success: false,
                    needsVerification: true,
                    message:'Please verify your email using the OTP sent to you',
                    email:response.data.user.email
                }
            }

            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setUser(response.data.user)
            axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
            return {success: true}
        } catch(error){
            console.error('Registration error' ,error)
            return{
                success: false,
                message: error.response?.data || {
                    error: 'Registration failed'
                }
            }
        }
    }

    const logout = async()=>{
        try{
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/logout/`, null, {
                headers : {
                    Authorization: `Token ${token}`
                }
            })
        } catch(error){
            console.error('Logout error: ',error)
        }

        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
    }

    return(
        <AuthContext.Provider value={{ 
            user, 
            token, 
            loading, 
            login, 
            register, 
            logout, 
            isAuthenticated: !!user 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)