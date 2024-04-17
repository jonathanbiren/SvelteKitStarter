import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';

async function authenticateUserLocal(email: string, password: string): Promise<{valid: boolean, commonName: string}> {
	const user = await prisma.userSmall.findUnique({
		where: { email }
	});
	if (!user) {
		return {
			valid: false,
			commonName: ''
		} 
	}
	return {
		valid: await bcrypt.compare(password, user.password),
		commonName: user.firstName + ' ' + user.lastName
	} 
}

export { authenticateUserLocal };