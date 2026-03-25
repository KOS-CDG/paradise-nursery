import React, { useState } from 'react'
import ProductList from './ProductList.jsx'
import CartItem from './CartItem.jsx'
import AboutUs from './AboutUs.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const navigateTo = (page) => setCurrentPage(page)

  if (currentPage === 'products') {
    return <ProductList navigateTo={navigateTo} />
  }
  if (currentPage === 'cart') {
    return <CartItem navigateTo={navigateTo} />
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <h1 className="company-name">Paradise Nursery</h1>
        <AboutUs />
        <button
          className="get-started-btn"
          onClick={() => navigateTo('products')}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App
