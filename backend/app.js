import express from "express"
import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static("public"))

//frontend path resolves
app.use("/styles", express.static(path.resolve("../frontend/styles")));
app.use("/scripts", express.static(path.resolve("../frontend/scripts")));
app.use("/assets", express.static(path.resolve("../frontend/assets")));

//routes import
import userRoutes from "./src/routers/user.routes.js"
import navigationRoutes from "./src/routers/prfectHnB.routes.js"
import appointmentRoutes from "./src/routers/appointment.routes.js"
import adminRoutes from "./src/routers/admin.routes.js"

//routes declaration 
app.use("/users", userRoutes)
app.use("/perfecthairnbeauty", navigationRoutes)
app.use("/appointments", appointmentRoutes);
app.use("/admin", adminRoutes)



export { app }
