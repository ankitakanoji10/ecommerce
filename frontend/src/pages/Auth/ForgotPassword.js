import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',
                { email,question,password })
            if (res.data.success) {
                // console.log('ankita');
                toast.success(res.data.message);
                navigate("/login");
            }
            else
            {
                toast.error(res.data.message);    
            }


        } catch (error) {
            console.log(error);
            toast.error('Error in forgot password');
        }
    }
  return (
    <Layout>
            <div className='register'>
            
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
                  <div className="mb-3">
                <label htmlFor="exampleInputQuestion" className="form-label">Answer</label>
                        <input type="text"
                            value={question}
                            onChange={(e)=>setQuestion(e.target.value)}
                            className="form-control"
                            id="exampleInputQuestion"
                            placeholder="What is your best friend's name?"
                            required
                        />
                </div>
                
                
                
                
                <button type="submit" className="btn btn-primary buttons">Submit</button>
            </form>
            </div>
        </Layout>
  )
}

export default ForgotPassword
