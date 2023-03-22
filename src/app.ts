import "express-async-errors"
import "reflect-metadata"
import express, {Application}  from "express";
import { errorHandler } from "./errors"
import userRoutes from "./routers/users.routes";

const app: Application = express()
app.use(express.json())

app.use("/users", userRoutes)

app.use(errorHandler)

export default app