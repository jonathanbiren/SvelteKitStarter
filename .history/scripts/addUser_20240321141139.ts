import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUser(email: string, name: string, password: string) {
  const user = await prisma.userSmall.create({
    data: {
        email,
        name, 
        password,
    },

})
 console.log(`User created $env{user.name} with email $env{user.email} and password $env{user.password}`)
};