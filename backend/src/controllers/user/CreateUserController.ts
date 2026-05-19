import { Request, Response } from "express";
import { CreateUserService} from "../../services/user/CreateUserService.js";

class createUserController {
    async handle(req: Request, res: Response){

        const createUserService = new CreateUserService();
        const user = await createUserService.execute();

        res.json({ message: user});
    }
}

export {createUserController};
