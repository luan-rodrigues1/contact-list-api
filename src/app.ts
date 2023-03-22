import "express-async-errors"
import "reflect-metadata"
import express, {Application}  from "express";
import { errorHandler } from "./errors"
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";

const app: Application = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", loginRoutes)

app.use(errorHandler)

export default app