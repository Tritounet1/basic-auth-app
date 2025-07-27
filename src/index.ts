import { exit } from "process"
import { User } from "../generated/prisma"
import prisma from "./client"
import client from "./client"
import crypto from "crypto"
import dotenv from 'dotenv'

dotenv.config()

const salt = process.env.CRYPTO_SALT

function generatePassword(password: string) {
  if(!salt) {
    console.log("CRYPTO_SALT not found.")
    exit(0)
  }
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return genHash
}
function validPassword(password: string, hash: string) {
  if(!salt) {
    console.log("CRYPTO_SALT not found.")
    exit(0)
  }
    const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === checkHash
}

async function createUser(email: string, password: string): Promise<User | null> {

  const hashedPassword: string = generatePassword(password)

  let user
  try {
    user = await prisma.user.create({
      data: {
        email: email, 
        password: hashedPassword,
      },
    })
  } catch(e) {
    return null
  }

  return user
}

async function getUser(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({where: {email: email}})
  return user
}

async function main() {
  const user = await createUser("tritou@gmail.com", "tritou1234")
  if(user) {
    console.log("User created.")
  }
  else {
    console.log("User already exist.")
  }
  /*
  const user = await getUser("tritou@gmail.com")
  console.log("user : ", user)
  if(user) {
    console.log("tritou1234 is valid password : ", validPassword("tritou1234", user.password))
  }
  const allUsers = await client.user.findMany()
  console.dir(allUsers, { depth: null })
  */
}

main()
  .then(async () => {
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })