import { Router } from "express";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.use(userRoutes);

routes.get("/",(req,res)=>{
     res.json({msg:"foi"})
});

export default routes;