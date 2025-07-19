import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import AddItems from './pages/AddItems'
import ListItems from './pages/ListItems'
import Orders from './pages/Orders'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'

const AppContent = () => {

  const [sidebarOpen, setSidebarOpen]=useState(false)
  const location= useLocation()
  const notLogin = ['/add', '/list', '/orders'].includes(location.pathname)

  return (
    <>
        <div className="min-h-screen bg-gray-50">
          {notLogin && <NavBar onMenuToggle={setSidebarOpen} />}
          <div className="flex pt-16">
            {notLogin && <SideBar isOpen={sidebarOpen} />}
            <main className="flex-1 p-4 lg:p-8">
              <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/add" element={<AddItems />} />
                <Route path="/list" element={<ListItems />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
          </div>
        </div>
    </>
  )
}

const App = () =>{
  return(
    <BrowserRouter>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App