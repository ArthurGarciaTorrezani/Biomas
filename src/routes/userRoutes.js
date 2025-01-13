import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { sessionController } from "../controllers/sessionController.js";
const userRoutes = Router();

// GET ALL USERS
userRoutes.get("/users",userController.users);

// GET USER
userRoutes.get("/user",userController.user)

// CREATE USER
userRoutes.post("/usercreate",userController.userCreate);

// UPDATE USER
userRoutes.put("/userupdate",userController.userUpdate);

userRoutes.get("/session",sessionController.sessionCreate);
export default userRoutes;