import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoute.js";
import comentRoutes from "./comentRoute.js"
import sessionRoutes from "./sessionRoute.js";

const routes = Router();

routes.use(sessionRoutes); 
routes.use(userRoutes);
routes.use(postRoutes);
routes.use(comentRoutes);


routes.get("/",(req,res)=>{
     res.json({msg:"foi"})
});


export default routes;