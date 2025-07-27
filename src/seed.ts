import client from "./client"
import { createUser } from "./user"

async function seed() {
    const user = await createUser("tritou@gmail.com", "tritou1234");
    if(user) {
      console.log("User created.");
    }
    else {
      console.log("User already exist.");
    }
}
  
seed()
    .then(async () => {
        await client.$disconnect();
    })
    .catch(async (e) => {
        console.error(e)
        await client.$disconnect();
        process.exit(1);
    })