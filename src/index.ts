import client from "./client";
import express from "express";
import { createUser, getUser } from "./user";

async function login(req: any, res: any) {
  if (!req.body) {
    res.send("Route excepted email and password.");
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.send("Route excepted email and password.");
    return;
  }

  const token = await getUser(email, password);

  if (!token) {
    res.send("Invalid email or password.");
    return;
  }

  res.send({
    token: token,
  });
}

async function register(req: any, res: any) {
  if (!req.body) {
    res.send("Route excepted email and password.");
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.send("Route excepted email and password.");
    return;
  }

  const token = await createUser(email, password);

  res.send({
    token: token,
  });
}

const app = express();
const port = 3000;

app.use(express.json());

app.post("/login", login);
app.post("/register", register);

app.listen(port, () => {
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
