import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors"
import { returnUserSchema } from "../../schemas/user.schemas";
import { IReturnUser } from "../../interfaces/users";

const uploadUserService = async (image: Express.Multer.File | undefined, userId: string): Promise<IReturnUser> => {
    if(!image) {
        throw new AppError("No files have been uploaded", 400)
    } 

    const userRepo = AppDataSource.getRepository(User)    
    const searchUser =  await userRepo.findOneBy({ id: userId });

    console.log(searchUser)

    const newProfilePicture = {
        profile_picture: image.filename
    }

    const updateUser = userRepo.create({
        ...searchUser,
        ...newProfilePicture
    })

    await userRepo.save(updateUser)

    const userWithoutPassword = returnUserSchema.parse(updateUser)

    return userWithoutPassword

}

export default uploadUserService