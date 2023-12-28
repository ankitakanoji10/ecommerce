import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
        
    } catch (error) {
        console.log(error);
        
    }

    
}
export const isAdmin = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unauthorized access"
            })
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "error in admin middleware",
            error
        })
    }
}