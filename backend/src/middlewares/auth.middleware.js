import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";
import { Admin } from "../models/admin.models.js";

const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
         if (!user){
            throw new ApiError(401, "Invalid Access Token")
         }
    
         req.user = user
         next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Error from auth")
    }

})


const JWTVerifyAdmin = asyncHandler( async(req, res, next) => {
    try {
        const adminToken = req.cookies?.adminAccessToken || req.header("Authorization")?.replace("Bearer", "")

        if(!adminToken){
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedAdminToken = jwt.verify(adminToken, process.env.ACCESS_TOKEN_SECRET)

        const admin = await Admin.findById(decodedAdminToken._id).select("-password") 

        if(!admin){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.admin = admin
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Error from admin authentication")
    }
})

export {  verifyJWT ,JWTVerifyAdmin }