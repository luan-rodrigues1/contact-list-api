import { Request, Response, NextFunction } from "express";
import { Schema, ZodTypeAny } from "zod";


const ensureDataIsValidMiddleware = (Schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validateData = Schema.parse(req.body)

    req.body = validateData

    return next()
}

export default ensureDataIsValidMiddleware