import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger";

import chatRouter from "./routes/chatbotRoutes";

const clientOrigin = process.env.CLIENT_ORIGIN as string;

const app = express();

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
    methods: ["POST", "GET"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/chats", chatRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server is running on port ${port}`));
