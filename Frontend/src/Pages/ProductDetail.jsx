import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./ProductDetail.css"
import axios from 'axios'
import { useState } from 'react';

const ProductDetail = () => {

  const { productId } = useParams()
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProductDetail()

  }, [productId])


  const getProductDetail = async () => {

    await axios.get("https://project-ecommerce-react-backend.onrender.com/products/" + productId)
      .then((res) => {
        console.log(res);
        setProductData(res.data.product);

      })
      .catch((err) => {
        console.log(err);
      })

  }

  return (
    <div className='home'>

      <div className="pr">
        <div><img src={productData.image} alt="Product" height="450px" /></div>
        <div>
          <div>
            <h1>{productData.title}</h1><br />
            <h2>Price: ₹{productData.price}</h2><br />
            <p>{productData.description}</p><br />
            <p><b>Category:</b> {productData.category}</p><br />

          </div>

          {/* <div className="buttons">
                <button><a href="/products/update">Update</a></button>
                <button><a href="/products/delete">Delete</a></button>
               </div> */}

        </div>

      </div>
    </div>
  )
}

export default ProductDetail