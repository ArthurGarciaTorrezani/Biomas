import { Router } from "express";
import { comentController } from "../controllers/comentController.js";
import auth from "../middlewares/auth.js";

const comentRoutes = new Router();


// GET ALL COMENTS
comentRoutes.get("/coments",comentController.coments);

// GET COMENT
comentRoutes.get("/coment",comentController.coment)

// CREATE COMENT
comentRoutes.post("/comentcreate",auth,comentController.comentCreate);

// UPDATE COMENT
comentRoutes.put("/comentupdate",auth,comentController.comentUpdate)

// DELETE
comentRoutes.delete("/comentdelete",auth,comentController.comentDelete)
export default comentRoutes;