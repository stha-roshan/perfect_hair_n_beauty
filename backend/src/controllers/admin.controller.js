import { Admin } from "../models/admin.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async(adminId) => {
    try{
        const admin = await Admin.findById(adminId)
        const adminAccessToken = admin.generateAccessToken()
        const adminRefreshToken = admin.generateRefreshToken()

        admin.refreshToken = adminRefreshToken
        await admin.save({validateBeforeSave: false})

        return {adminAccessToken, adminRefreshToken}
    }catch(error){
        throw new ApiError(500, "Something went wrong while creating admins access and refresh token")
    }
}

const options = {
    httpOnly: true,
    secure: true
}

const registerAdmin = asyncHandler (async(req, res) => {
    const {username, password} = req.body

    const existingadmin = await Admin.findOne({username})

    if(existingadmin){
        throw new ApiError(409, "Admin with this username already exists")
    }

    const admin = await Admin.create({
        username,
        password
    })

    console.log(`created admin : `, admin)

    const createdAdmin = await Admin.findById(admin._id)

    if(!createdAdmin){
        throw new ApiError(500, "something went wrong while regestiring admin")
    }

    return res.status(201).json(
        new ApiResponse(200, createdAdmin, "Admin created successfully")
    )
})


//login user controller
const loginAdmin = asyncHandler( async(req, res) => {
    const {username, password} = req.body

    if(!username){
        throw new ApiError(400, "Admin Username is required")
    }

    const admin = await Admin.findOne({username})
     if(!admin){
        throw new ApiError(404, "Admin not found")
     }

     if(admin.password !== password){
        return res.status(401).json({message: "Invalid credentials"})
     }

     const {adminAccessToken, adminRefreshToken} = await generateAccessAndRefreshToken(admin._id)
     const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

     return res
     .status(200)
     .cookie("adminAccessToken", adminAccessToken, options)
     .cookie("adminRefreshToken", adminRefreshToken, options)
     .json(
        new ApiResponse(
            200, 
            {
                admin: loggedInAdmin, adminAccessToken, adminRefreshToken
            },
            "Admin logged inn successfully -- admin here"
        )
     )
})

export { registerAdmin, loginAdmin }