import { Request, Response } from "express";
import { ICreateUser } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import updateUserService from "../services/users/updateUser.service";

const createdUserController = async (req: Request, res: Response) => {
    const userData: ICreateUser = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser)
}

const updateUserController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const deleteUserInfo = await updateUserService(req.body, userId)
    return res.status(200).json(deleteUserInfo)
}

export {createdUserController, updateUserController}