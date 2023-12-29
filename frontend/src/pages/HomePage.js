import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'

import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';
const HomePage = () => {
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong")
    }
  }
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-categories");
      setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const handleFilter = async (value, id) => {
    let all = [ ...checked ];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c =>c!==id)
    }
    setChecked(all);
  }
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <Layout title ={"E-commerce app"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h6 className='text-center' >Filter By Category </h6>
          <div className='d-flex flex-column'>
          {categories?.map((c) => (
            <Checkbox key={c._id} onChange = {(e)=>handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
          ))}
          </div>
          <h6 className='text-center mt-4' >Filter By Price </h6>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>{Prices?.map(p => (
              <div key = {p._id}>
                <Radio value= {p.array}>{p.name}</Radio>
                </div>
            ))}</Radio.Group>
          </div>
          <div className='d-flex flex-column'>
            <button className='btn btn-danger' onClick={() =>window.location.reload()}>Clear Filters</button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio,null,4)} */}
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map(p => (
      
          <div className="card m-2" style={{ width: "18rem" }}>
            <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
            />
            <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0,30)}</p>
                <p className="card-text fw-bold">Rs.{p.price}</p>
                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product-details/${p.slug}`)}>More Details</button>
                <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >Add to Cart</button>
            </div>
          </div>
            
        ))}
          </div>
          <div className='m-2 p-3'>
          {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage