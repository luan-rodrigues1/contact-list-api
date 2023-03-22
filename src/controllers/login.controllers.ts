import { Request, Response } from "express" 
import { ILoginUser } from "../interfaces/users" 
import loginUserService from "../services/login/loginUser.service"

const loginUserController = async (req: Request, res: Response) =>{
    
    const sessionData: ILoginUser = req.body
    const token = await loginUserService(sessionData)
    
    return res.status(200).json({token})
}

export default loginUserController