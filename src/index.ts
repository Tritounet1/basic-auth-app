import client from "./client";
import express from "express";
import { login, me, register, authMiddleware, home } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", home);

app.post("/login", login);
app.post("/register", register);

app.get("/me", [authMiddleware] , me);

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}!`);
});

process.on("SIGINT", async () => {
  console.log("Stopping server...");
  await client.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Stopping server...");
  await client.$disconnect();
  process.exit(0);
});

process.on("unhandledRejection", async (reason, promise) => {
  await client.$disconnect();
  process.exit(1);
});