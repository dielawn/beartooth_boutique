import { useState } from "react";
import { earrings } from "./product_list";

export const Product = ({ addToCart }) => {

    return (
        <div>
            <h2>Items for Sale</h2>
            <div className="productsDiv">
              {earrings.map((item) => (
                <div key={item.id} className="productCard">
                <img 
                    className="productImg"
                    src={item.image1} 
                    alt="Description of the image"        
                />
                  {item.name} - ${item.price.toFixed(2)}
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
    )
}