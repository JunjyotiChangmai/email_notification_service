import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import { PORT } from "./config.js";
import router from "./routes/routes.js";
import { verifySMTP } from "./services/smtp_service.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', router)

const startServer = async () => {
  try {
    await verifySMTP();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("SMTP verification failed");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();