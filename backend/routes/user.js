import express from "express";
import { register ,login, profile} from "../controllers/user.js";
import { Authentication } from "../middleware/auth.js";

const router = express.Router();
//register user
router.post("/register",register);

//login user
router.post("/login",login);

//profile
router.get('/user',Authentication, profile)
export default router; 