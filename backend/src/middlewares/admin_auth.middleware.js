import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.models.js";

export const verifyAdmin = asyncHandler( async(req, res) => {
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