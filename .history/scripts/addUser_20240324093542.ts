import bcrypt from 'bcrypt';
//Prisma Client is singleton, so we can import it in any file and it will be the same instance
import prisma from '../src/lib/prisma';


//In order to run this script, run the following command: 
//npx ts-node scripts/addUser.ts [email@example.com] [] "password"


async function addUser(email: string, name: string, password: string) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await prisma.userSmall.create({
		data: {
			email,
			name,
			password: hashedPassword
		}
	});
	console.log(`User created ${user.name} with email ${user.email}`);
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
