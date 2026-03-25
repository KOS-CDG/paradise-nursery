import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from './CartSlice.jsx'
import './ProductList.css'

const plantsData = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Peace Lily', price: 12.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=300&auto=format&fit=crop', description: 'Elegant white blooms, great air purifier.' },
      { name: 'Spider Plant', price: 8.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300&auto=format&fit=crop', description: 'Easy care, removes toxins effectively.' },
      { name: 'Boston Fern', price: 10.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop', description: 'Lush green fronds, natural humidifier.' },
      { name: 'Aloe Vera', price: 9.99, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300&auto=format&fit=crop', description: 'Healing properties and easy to grow.' },
      { name: 'Snake Plant', price: 14.99, image: 'https://images.unsplash.com/photo-1599598425947-5202edd56fde?w=300&auto=format&fit=crop', description: 'Tolerates low light, purifies overnight.' },
      { name: 'Bamboo Palm', price: 19.99, image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=300&auto=format&fit=crop', description: 'Tropical feel, excellent air cleaner.' },
    ],
  },
  {
    category: 'Aromatic & Fragrant Plants',
    plants: [
      { name: 'Lavender', price: 11.99, image: 'https://images.unsplash.com/photo-1468618565860-cad8f6558559?w=300&auto=format&fit=crop', description: 'Calming scent, beautiful purple blooms.' },
      { name: 'Jasmine', price: 13.99, image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=300&auto=format&fit=crop', description: 'Sweet fragrance, perfect indoors.' },
      { name: 'Rosemary', price: 7.99, image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300&auto=format&fit=crop', description: 'Fragrant herb, doubles in the kitchen.' },
      { name: 'Mint', price: 6.99, image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300&auto=format&fit=crop', description: 'Fresh minty aroma, easy to grow.' },
      { name: 'Gardenia', price: 16.99, image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=300&auto=format&fit=crop', description: 'Stunning white flowers, rich fragrance.' },
      { name: 'Lemon Balm', price: 8.49, image: 'https://images.unsplash.com/photo-1604177091072-9ab735c681f5?w=300&auto=format&fit=crop', description: 'Citrus scent, stress-relieving herb.' },
    ],
  },
  {
    category: 'Succulent & Cactus Plants',
    plants: [
      { name: 'Echeveria', price: 7.49, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&auto=format&fit=crop', description: 'Rosette shaped, low maintenance beauty.' },
      { name: 'Barrel Cactus', price: 9.49, image: 'https://images.unsplash.com/photo-1550060049-ac2eca68c15f?w=300&auto=format&fit=crop', description: 'Classic cactus, drought tolerant.' },
      { name: 'Haworthia', price: 8.99, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c76ea4?w=300&auto=format&fit=crop', description: 'Compact succulent, thrives indoors.' },
      { name: 'Jade Plant', price: 11.49, image: 'https://images.unsplash.com/photo-1596547620682-f00a7f8fefc0?w=300&auto=format&fit=crop', description: 'Symbol of good luck, very resilient.' },
      { name: 'Zebra Plant', price: 10.49, image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=300&auto=format&fit=crop', description: 'Striking stripes, architectural appeal.' },
      { name: 'String of Pearls', price: 13.49, image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?w=300&auto=format&fit=crop', description: 'Unique trailing succulent, conversation starter.' },
    ],
  },
]

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

function ProductList({ navigateTo }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const isInCart = (plantName) => cartItems.some(item => item.name === plantName)

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant))
  }

  return (
    <div className="product-page">
      <Navbar navigateTo={navigateTo} cartCount={cartCount} />
      <div className="product-container">
        <h1 className="product-title">Our Houseplants</h1>
        {plantsData.map((category) => (
          <div key={category.category} className="category-section">
            <h2 className="category-title">{category.category}</h2>
            <div className="plants-grid">
              {category.plants.map((plant) => (
                <div key={plant.name} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                  <div className="plant-info">
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-desc">{plant.description}</p>
                    <p className="plant-price">${plant.price.toFixed(2)}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
