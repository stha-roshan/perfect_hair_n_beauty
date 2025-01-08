import { User } from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

//generating access and refresh tokens
const gerenateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating Access and Refresh Tokens")
    }
}

//cookies options declaration
const options = {
    httpOnly: true,
    secure: true
}


// regular expressions 
const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^98\d{8}$/;
const nameRegex = /^[A-Za-z\s'-]+$/;


// user registration logic
const registerUser = asyncHandler( async (req, res) => {
    const {fullName, email, phone, password} = req.body

    if(fullName ==="" || !nameRegex.test(fullName)){
        throw new ApiError(400, "Full name is required and must only contain letters, spaces, apostrophes, or hyphens.")
    }

    if (email === "" || !emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    if (phone === "" || !phoneRegex.test(phone)) {
        throw new ApiError(400, "Invalid phone number format");
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new ApiError(409, "User with this email already exists")
    }

    const user = await  User.create({
        fullName,
        email,
        phone,
        password
    })

    console.log('Created User:', user)

    const createdUser = await User.findById(user._id)

    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfylly", )
    )
})

// fetching all users from database --logic
const getAllUsers = asyncHandler( async(req, res) => {
    const databaseUsers = await User.find({}, "fullName email phone")

    const response = new ApiResponse(200, databaseUsers, "All users registered in database successfully fetched")

    res
    .status(response.statusCode)
    .json(response)
})

// login user controller logic
const loginUser = asyncHandler( async(req, res) => {

    const {email, password} = req.body

    if(!email){
        throw new ApiError(400, "email is required" )
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User not found")
    }

    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = await gerenateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully"

        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )
})

export { registerUser, getAllUsers, loginUser, logoutUser}