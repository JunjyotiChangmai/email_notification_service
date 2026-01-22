import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import { PORT } from "./config.js";
import router from "./routes/routes.js";
import { transporter } from "./services/smtp_service.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

transporter.verify()
  .then(() => console.log("SMTP verified"))
  .catch(err => console.error("SMTP error:", err.message));