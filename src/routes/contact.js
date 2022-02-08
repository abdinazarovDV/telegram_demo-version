import { Router } from "express";
const router = Router();
import { contactController } from "#c/contact"

router.route('/')
    .get(contactController.GET)
    .post(contactController.POST)
    .delete(contactController.DELETE)

router.route('/withmessage')
    .get(contactController.MessageGET)

export default router