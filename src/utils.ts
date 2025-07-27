import { exit } from "process"
import crypto from "crypto"
import dotenv from 'dotenv'

dotenv.config()

const salt = process.env.CRYPTO_SALT;

export function generatePassword(password: string) {
  if(!salt) {
    console.log("CRYPTO_SALT not found.");
    exit(0);
  }
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return genHash;
}

export function validPassword(password: string, hash: string) {
  if(!salt) {
    console.log("CRYPTO_SALT not found.");
    exit(0);
  }
    const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === checkHash;
}
