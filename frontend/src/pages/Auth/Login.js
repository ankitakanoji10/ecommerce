import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import "../../styles/AuthStyles.css";
const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',
                { email, password })
            if (res.data.success) {
                // console.log('ankita');
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token:res.data.token

                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state||"/");
            }
            else
            {
                toast.error(res.data.message);    
            }


        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    const handleForgotPassword = () => {
        try {
            navigate("/forgot-password");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout>
            <div className="form-container " style={{ minHeight: "90vh" }}>
            <h4 className="title">Log In</h4>
            <form onSubmit={handleSubmit}>
               
                <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                        <input type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter your email'  
                            required
                        />
                </div> 
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter your password'
                            required
                        />
                </div>
                <div className = "mb-3">
                <button type="button" className="btn forgot-btn" onClick={handleForgotPassword}>Forgot Password</button>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </Layout>
  )
}

export default Login
