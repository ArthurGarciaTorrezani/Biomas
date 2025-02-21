import { Router } from "express";
import { postController } from "../controllers/postController.js";
import auth from "../middlewares/auth.js";

const postRoutes = new Router();

// GET ALL POSTS
postRoutes.get("/posts",postController.posts);

// GET POST
postRoutes.get("/post",postController.post);

// CREATE POST
postRoutes.post("/postcreate",auth,postController.postCreate);

// UPDATE POST
postRoutes.put("/postupdate",auth,postController.postUpdate);

postRoutes.get("/postscoments",postController.postscoments)

export default postRoutes;
