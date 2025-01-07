import { Router } from "express";
import { postController } from "../controllers/postController.js";

const postRoutes = new Router();

// GET ALL POSTS
postRoutes.get("/posts",postController.posts);

// GET ALL POST
postRoutes.get("/post",postController.post);

// CREATE POST
postRoutes.post("/postcreate",postController.postCreate);

// UPDATE POST
postRoutes.put("/postupdate",postController.postUpdate);


export default postRoutes;
