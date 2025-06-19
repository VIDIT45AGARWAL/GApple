import React, { useState } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import AddItems from './pages/AddItems'
import ListItems from './pages/ListItems'

const App = () => {

  const [sidebarOpen, setSidebarOpen]=useState(false)

  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        <NavBar onMenuToggle={setSidebarOpen}/>
        <div className='flex pt-16'>
          <SideBar isOpen={sidebarOpen}/>
          <main className='flex-1 p-4 lg:p-8'>
            {/* <AddItems/> */}
            <ListItems/>
          </main>
        </div>
      </div>
    </>
  )
}

export default App