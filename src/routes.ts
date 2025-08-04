import { decode } from "./utils";
import { getUser, createUser } from "./user";
import { Request, Response, NextFunction } from 'express';
import { saveToHistory, getHistory } from "./history";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function home(req: Request, res: Response) {
  res.send({
    routes: {
      GET: {
        me: {
          response: {},
          data: {},
        },
        history: {
          response: {},
          data: {},
        }
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

export async function login(req: Request, res: Response) {
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

export async function register(req: Request, res: Response) {
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

export async function me(req: Request, res: Response) {
  res.send({
    me: req.user,
  });
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

export const historyMiddleware = (req: Request, res: Response, next: NextFunction) => {  
  res.on('finish', async() => {
    await saveToHistory(req?.user?.id || null, req.method, req.path, res.statusCode, req.ip || "", req.get('user-agent') || "")
  });

  next();
}

export const history = async(req: Request, res: Response, next: NextFunction) => {  
  const history = await getHistory();
  res.send(history)
}