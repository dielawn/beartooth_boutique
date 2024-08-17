import { useState } from 'react'
import './App.css'
import { ShoppingCart } from './Cart'

function App() {
  

  return (
    <div>
      <div className='navDiv'>
        <p>shop, cart, login/signup</p>
      </div>
      <div className='productDiv'>
        <ShoppingCart />
      </div>
    </div>
  )
}

export default App
