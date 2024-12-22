import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const adminSchema =  new mongoose.Schema(
    
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: { 
            type: String, 
        },
    }, 
    {timestamps: true}
)

adminSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        //payload
        {
            _id : this._id,
            username: this.username
        },
        //accesstoken secret
        process.env.ACCESS_TOKEN_SECRET,
        //accesstoken expiry
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

adminSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        //payload
        {
            _id : this._id,
        },
        //refreshtoken secret
        process.env.REFRESH_TOKEN_SECRET,
        //refreshtoken expiry
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Admin = mongoose.model('Admin', adminSchema)