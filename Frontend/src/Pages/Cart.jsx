import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./cart.css"

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get('http://localhost:3000/cart')
      .then((response) => {
        const grouped = groupByProduct(response.data);
        setCart(grouped);
      })
      .catch((error) => console.error('Error fetching cart:', error));
  };

  const groupByProduct = (items) => {
    const map = new Map();

    for (const item of items) {
      const id = item.productId._id;
      if (map.has(id)) {
        map.get(id).quantity += 1;
      } else {
        map.set(id, { ...item.productId, quantity: 1 });
      }
    }

    return Array.from(map.values());
  };

  const reduceQuantity = (productId) => {
    axios.delete(`http://localhost:3000/cart/reduce/${productId}`)
      .then(() => fetchCart())
      .catch((err) => console.error('Error reducing quantity:', err));
  };

  const deleteProduct = (productId) => {
    axios.delete(`http://localhost:3000/cart/delete/${productId}`)
      .then(() => fetchCart())
      .catch((err) => console.error('Error deleting product:', err));
  };

  return (
    <div>
      <div className='head'>
        <h2>Product Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className="no"><p>Empty cart</p></div>
      ) : (
        <div style={styles.cardContainer}>
          {cart.map((item) => (
            <div key={item._id} style={styles.card}>
              <img
                src={item.image}
                alt={item.title}
                style={styles.image}
              />
              <h3>{item.title}</h3>
              <p>₹{item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>

              <div style={{ marginTop: '10px' }}>
                <button onClick={() => reduceQuantity(item._id)} style={styles.btn}>−</button>
                <button onClick={() => deleteProduct(item._id)} style={{ ...styles.btn, backgroundColor: '#e74c3c' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  btn: {
    margin: '5px',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#3498db',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Cart;