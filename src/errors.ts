import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
class AppError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number = 400) {
        super()
        this.message = message,
        this.statusCode = statusCode
    }
}

const errorHandler = (error: any, req: Request, res: Response, _: NextFunction) =>{
    if(error instanceof AppError){
        console.log("chegou aqui")
        return res.status(error.statusCode).json({message: error.message})
    }

    if(error instanceof ZodError){
        return res.status(400).json(error.flatten().fieldErrors)
    }

    return res.status(500).json({
        message: "Internal server error"
    })
}

export {AppError,errorHandler}