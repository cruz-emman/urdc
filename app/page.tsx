'use client'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'

const Home = () => {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <div className='container'>

    </div>
  )
}



const MobileView = () => {
  return (
    <div>
      <h1>Mobile View</h1>
    </div>
  )
}

const DesktopView = () => {
  return (
    <div>
      <h1>Desktop View</h1>
    </div>
  )
}

export default Home