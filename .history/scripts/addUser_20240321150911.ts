import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function addUser(email: string, name: string, password: string) {
	
	const salt = await bcrypt.salt(10); 
	const hashedPassword = await bcrypt.hash(password)

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

if (!email || !name || !password) {
	console.error('Please provide an email, name, and password in that order');
	process.exit(1);
}

addUser(email, name, password)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
