import axios from "axios";
import { useState, useEffect, useContext, createContext} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user, setUser]= useState(null)
    const [token , setToken]= useState(localStorage.getItem('token'))
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchUser = async()=>{
            if(token){
                try{
                    const response= await axios.get(`${import.meta.env.VITE_API_BASE_URL}auth/user/`, {headers:{Authorization: `Token ${token}`}})
                    setUser(response.data)
                    setIsAuthenticated(true)
                } catch(error){
                    console.error('Error fetching user', error.message)
                    localStorage.removeItem('token')
                    setToken(null)
                    setUser(null)
                    setIsAuthenticated(false)
                    navigate('/login')
                }
            } else{
                setIsAuthenticated(false)
                setUser(null)
            }
        }
        fetchUser()
    },[token, navigate])

    return(
        <AuthContext.Provider value={{user, setUser, token, setToken, isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)