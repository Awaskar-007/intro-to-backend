import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../../controller/user.controller.js";
const router = Router(); // create a router instance



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


export default router;
