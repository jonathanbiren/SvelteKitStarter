import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addUser(email: string, name: string, password: string) {
	const user = await prisma.userSmall.create({
		data: {
			email,
			name,
			password
		}
	});
	console.log(`User created ${user.name} with email ${user.email} and password ${user.password}`);
}

const [email, name, password] = process.argv.slice(2); 

