import express from "express";
import numberController from "./controller/numberController";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Logging to debug app startup
console.log("Setting up routes...");

app.use("/numbers", numberController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
