import { Router } from "express";
import { sendEmail, sendNotification } from "../controller/controller.js";

const router = Router();

router.post("/sendemail", sendEmail);
router.post("/send", sendNotification);

router.get("/health", (req, res) => {
  res.send("Email Notification Service is running");
});

export default router;

