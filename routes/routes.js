import { Router } from "express";
import { sendEmail } from "../controller/controller.js";

const router = Router();

router.post("/send", sendEmail);

export default router;

