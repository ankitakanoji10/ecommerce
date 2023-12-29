import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'
const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate()
    const getProduct = async () => {
        try {
            
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (params?.slug)
            getProduct();
    }, [params?.slug]);
    const getSimilarProduct = async (pid, cid) => {
        try {
          const { data } = await axios.get(
            `/api/v1/product/related-product/${pid}/${cid}`
          );
          setRelatedProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <Layout>
        <div className="row container mt-2">
        <div className="col-md-5 ">
        <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top "
            alt={product.name}
            height="400"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 m-3">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-3 m-lg-2">ADD TO CART</button>
        </div>
          
        </div>
        <div className="row container">
            <h4 className='p-3'>Similar Products</h4>  
            {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
              )}
            <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text fw-bold"> Rs. {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
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
        </div>
    </Layout>
  )
}

export default ProductDetails
