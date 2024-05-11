import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';

//TODO: Make it so that the email is also passed out of this function
async function authenticateUserLocal(
	email: string,
	password: string
): Promise<{ valid: boolean; commonName: string, userMail: string }> {

	const user = await prisma.userSmall.findUnique({
		where: { email }
	});

	if (!user) {
		return {
			valid: false,
			commonName: '',
			userMail: ''


		};
	}
	return {
		valid: await bcrypt.compare(password, user.password),
		commonName: user.firstName + ' ' + user.lastName,
		userMail: user.email

	};
}

export { authenticateUserLocal };
