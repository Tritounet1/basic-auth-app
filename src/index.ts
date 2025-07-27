import client from "./client"
import express from 'express'
import { createUser, getUser } from "./user";

function login(req: any, res: any) {
  const email = req.body.email;
  const password = req.body.password;
  
  if(!email || !password) {
    res.send("Route excepted email and password.");
    return;
  }

  const user = getUser(email, password);

  res.send({
    token: '...',
  });
}

function register(req: any, res: any) {
  const email = req.body.email;
  const password = req.body.password;
  
  if(!email || !password) {
    res.send("Route excepted email and password.");
    return;
  }

  const user = createUser(email, password);

  res.send({
    token: '...',
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

process.on('SIGINT', async () => {
  console.log('Stopping server...');
  await client.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Stopping server...');
  await client.$disconnect();
  process.exit(0);
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught exception:', err);
  await client.$disconnect();
  process.exit(1);
});
