import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoute.js";

const routes = Router();

routes.use(userRoutes);
routes.use(postRoutes);

routes.get("/",(req,res)=>{
     res.json({msg:"foi"})
});

export default routes;