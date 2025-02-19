import { Router } from "express";
import { userController } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRoutes = Router();

// GET ALL USERS
userRoutes.get("/users",userController.users);

// GET USER
userRoutes.get("/user",userController.user)

// CREATE USER
userRoutes.post("/usercreate",userController.userCreate);

// UPDATE USER
userRoutes.put("/userupdate",auth,userController.userUpdate);

export default userRoutes;