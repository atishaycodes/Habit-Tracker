import React from 'react'
import LeftSidebar from './components/LeftSidebar'
import Middle from './components/Middle'
import RightSidebar from './components/rightSidebar'


const App = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-gray-100">
      <LeftSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <Middle />
      </main>
      <RightSidebar />
    </div>
  )
}

export default App
