import { User } from "../generated/prisma"
import client from "./client"
import { generatePassword, validPassword, sign } from "./utils"

export async function createUser(email: string, password: string): Promise<string | null> {
    const hashedPassword: string = generatePassword(password);
    let user
    try {
        user = await client.user.create({
        data: {
            email: email, 
            password: hashedPassword,
        },
        });
    } catch(e) {
        // TODO: return the error
        return null
    }
    return sign({user: user.email});
}
  
export async function getUser(email: string, password: string): Promise<string | null> {
    const user = await client.user.findUnique({where: {email: email}})
    if(!user) {
        return null; // TODO: return error : user not found
    }
    if(!validPassword(password, user!.password)) {
        return null; // TODO: return error : incorrect auth
    }
    return sign({user: user!.email});
}
