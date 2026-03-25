import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from './CartSlice.jsx'
import './CartItem.css'

function Navbar({ navigateTo, cartCount }) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigateTo('landing')}>🌿 Paradise Nursery</div>
      <div className="nav-links">
        <button className="nav-btn" onClick={() => navigateTo('landing')}>Home</button>
        <button className="nav-btn" onClick={() => navigateTo('products')}>Plants</button>
        <button className="nav-btn cart-nav-btn" onClick={() => navigateTo('cart')}>
          🛒 <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </nav>
  )
}

function CartItem({ navigateTo }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
  }

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeItem(item.name))
    }
  }

  const handleDelete = (itemName) => {
    dispatch(removeItem(itemName))
  }

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery 🌿')
  }

  return (
    <div className="cart-page">
      <Navbar navigateTo={navigateTo} cartCount={cartCount} />
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        <div className="cart-summary">
          <div className="summary-item">
            <span>Total Plants:</span>
            <strong>{cartCount}</strong>
          </div>
          <div className="summary-item">
            <span>Total Cost:</span>
            <strong>${totalCost.toFixed(2)}</strong>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>🌱 Your cart is empty. Start adding some plants!</p>
            <button className="continue-btn" onClick={() => navigateTo('products')}>
              Browse Plants
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.name} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit-price">Unit Price: ${item.price.toFixed(2)}</p>
                    <p className="cart-item-total">Item Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn decrease-btn" onClick={() => handleDecrease(item)}>−</button>
                    <span className="qty-display">{item.quantity}</span>
                    <button className="qty-btn increase-btn" onClick={() => handleIncrease(item)}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(item.name)} title="Remove item">🗑️</button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button className="continue-btn" onClick={() => navigateTo('products')}>
                ← Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartItem
