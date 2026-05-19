import { Router } from "express";
import { createUserController } from "./controllers/user/CreateUserController.js";

const router = Router();

router.post("/users", new createUserController().handle);

export {router}