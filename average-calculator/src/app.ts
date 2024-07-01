import express from "express";
import numberController from "./controller/numberController";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Logging to debug app startup
console.log("Setting up routes...");

app.use("/numbers", numberController);

const PORT = process.env.PORT || 0;
const server = app.listen(PORT, () => {
  const actualPort = server.address(); // Use optional chaining to safely access port
  if (actualPort) {
    console.log(`Server running on port ${actualPort}`);
  } else {
    console.error("Failed to retrieve server port.");
  }
});

export default app;
