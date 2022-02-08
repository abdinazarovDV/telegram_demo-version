import { Router } from "express";
const router = Router();
import { registerController } from "#c/register"

router.route('/')
    .post(registerController.POST)

export default router