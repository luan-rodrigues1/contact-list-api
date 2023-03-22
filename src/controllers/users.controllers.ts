import { Request, Response } from "express";
import { ICreateUser } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";

const createdUserController = async (req: Request, res: Response) => {
    const userData: ICreateUser = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser)
}

export {createdUserController}