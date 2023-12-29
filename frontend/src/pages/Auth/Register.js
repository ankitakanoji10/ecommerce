import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',
                { name, email, password, phone, address, question})
            if (res&&res.data.success) {
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
            toast.error('Error in signup');
        }
    }
    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "90vh" }}>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder='Enter your name'
                            required
                        />
                    
                </div>
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
                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                        <input type="text"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone "
                            placeholder='Enter your phone'
                            required
                        />
                    
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder='Enter your address'
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
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
                </div>
              
        </Layout>
    )
}

export default Register
