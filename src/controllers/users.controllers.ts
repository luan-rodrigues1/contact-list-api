import { Request, Response } from "express";
import { ICreateUser } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import infoUserService from "../services/users/infoUser.service";
import updateUserService from "../services/users/updateUser.service";

const createdUserController = async (req: Request, res: Response) => {
    const userData: ICreateUser = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser)
}

const infoUserController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const infoUser = await infoUserService(userId)
    return res.status(200).json(infoUser)
}

const updateUserController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const deleteUserInfo = await updateUserService(req.body, userId)
    return res.status(200).json(deleteUserInfo)
}

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const deleteUserInfo = await deleteUserService(userId)
    return res.status(204).json(deleteUserInfo)
}

export {createdUserController, updateUserController, infoUserController, deleteUserController}