import { Router } from "express";
const router = Router();
import { loginController } from "#c/login"

router.route('/')
    .post(loginController.POST)

export default router