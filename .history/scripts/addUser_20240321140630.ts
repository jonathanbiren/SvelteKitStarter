import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUser() {
  const user = await prisma.user.create({
    data: {
        email,
        name, 
        pass