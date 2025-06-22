import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import AddItems from './pages/AddItems'
import ListItems from './pages/ListItems'
import Orders from './pages/Orders'

const App = () => {

  const [sidebarOpen, setSidebarOpen]=useState(false)

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <NavBar onMenuToggle={setSidebarOpen} />
          <div className="flex pt-16">
            <SideBar isOpen={sidebarOpen} />
            <main className="flex-1 p-4 lg:p-8">
              <Routes>
                <Route path="/add" element={<AddItems />} />
                <Route path="/list" element={<ListItems />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/" element={<ListItems />} />
              </Routes>
            </main>
          </div>
        </div>
    </BrowserRouter>
    </>
  )
}

export default App