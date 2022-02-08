import { Router } from "express";
const router = Router();
import { messageController } from "#c/message"

router.route('/')
    .get(messageController.GET)
    .post(messageController.POST)
    .delete(messageController.DELETE)

export default router