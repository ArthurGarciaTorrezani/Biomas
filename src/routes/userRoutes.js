import { Router } from "express";
import { userController } from "../controllers/userController.js";

const userRoutes = Router();

// GET ALL USERS
userRoutes.get("/users",userController.users);

// GET USER
userRoutes.post("/user",userController.user)

// CREATE USER
userRoutes.post("/usercreate",userController.userCreate);

// UPDATE USER
userRoutes.put("/userupdate",userController.userUpdate)

export default userRoutes;