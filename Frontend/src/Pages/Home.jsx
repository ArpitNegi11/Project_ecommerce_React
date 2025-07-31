import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const Home = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:3000/")
      .then((res) => {
        console.log(res.data.products);
        setProductData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
   <div>
      <Navbar/>
     <div className="container">

      {productData.map((elem, index) => {
        return <div className="card" key={index}>
          <div className="top">
            <img
              src={elem.image}
              alt=""
              width="200px"
            />
          </div>
          <div className="bottom">
            <Link to={`/admin/products/detail/${elem._id}`}><h1>{elem.title}</h1></Link>
            <h4>Price : {elem.price}</h4>
          </div>
        </div>;
      })}
    </div>
   </div>
  );
};

export default Home;