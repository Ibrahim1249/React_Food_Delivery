

import React from 'react'
import { assets } from '../assets/assets'

function FoodItem({food}) {
  return (
    <>
         <div className="food-item">
           <div className="food-item-img-container">
              <img className='food-item-image' src={food.image} alt="" />
           </div>
           <div className="food-item-info">
              <div className="food-item-name-rating">
                 <p>{food.name}</p>
                 <img src={assets.rating_starts} alt="" />
              </div>
              <p className='food-item-desc'>{food.description}</p>
              <p className='food-item-price'>${food.price}</p>
           </div>
         </div>
    </>
  )
}

export default FoodItem