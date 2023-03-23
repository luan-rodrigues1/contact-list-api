import "express-async-errors"
import "reflect-metadata"
import express, {Application}  from "express";
import { errorHandler } from "./errors"
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import contactRoutes from "./routers/contacts.routes";
import cors from "cors"

const app: Application = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})
app.use("/files", express.static("src/uploads"))
app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/contacts", contactRoutes)
app.use(errorHandler)

export default app