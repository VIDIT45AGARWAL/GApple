import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const getFoods =(category = null) =>{
    const params = category ? {params : {category}} : {}
    return API.get('foods/', params)
}

export const getFoodById = (id) => API.get(`foods/${id}`)
export const createFood = (foodData) => API.post('foods/', foodData)
export const updateFood = (id, foodData) => API.put(`foods/${id}/`, foodData)
export const deleteFood = (id) => API.delete(`foods/${id}/`)

export default API