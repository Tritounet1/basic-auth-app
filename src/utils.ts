import { exit } from "process"
import crypto from "crypto"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const CRYPTO_SALT = process.env.CRYPTO_SALT;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

export function sign(payload: object): string {
    if(!JWT_PRIVATE_KEY) {
      console.log("JWT_PRIVATE_KEY not found.");
      exit(0);
    }
    const token = jwt.sign(payload, JWT_PRIVATE_KEY);
    return token
}

export function generatePassword(password: string): string {
  if(!CRYPTO_SALT) {
    console.log("CRYPTO_SALT not found.");
    exit(0);
  }
    const genHash = crypto.pbkdf2Sync(password, CRYPTO_SALT, 10000, 64, 'sha512').toString('hex');
    return genHash;
}

export function validPassword(password: string, hash: string): boolean {
  if(!CRYPTO_SALT) {
    console.log("CRYPTO_SALT not found.");
    exit(0);
  }
    const checkHash = crypto.pbkdf2Sync(password, CRYPTO_SALT, 10000, 64, 'sha512').toString('hex');
    return hash === checkHash;
}
