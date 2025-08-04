import { decode } from "./utils";
import { getUser, createUser } from "./user";

export async function home(req: any, res: any) {
  res.send({
    routes: {
      GET: {
        me: {
          response: {},
          data: {},
        },
      },
      POST: {
        login: {
          response: {},
          data: {},
        },
        register: {
          response: {},
          data: {},
        },
      },
    },
  });
}

export async function login(req: any, res: any) {
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

export async function register(req: any, res: any) {
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

  if (!token) {
    res.send("User already existe.");
    return;
  }

  res.send({
    token: token,
  });
}

export async function me(req: any, res: any) {
  res.send({
    me: req.user,
  });
}

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const decoded = decode(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = decoded;
  next();
};
