import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUser(email: string, name: string, password: string) {
  const user = await prisma.user.create({
    data: {
        email,
        name, 
        password,
    },

    console.log(`User created: ${user.name} (id: ${user.id})`)
});