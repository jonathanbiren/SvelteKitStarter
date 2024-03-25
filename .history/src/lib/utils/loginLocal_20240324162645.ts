
import bcrypt from 'bcrypt';
async function authenticateUserLocal(email: string, password: string): Promise<boolean> {
	const user = await prisma.userSmall.findUnique({
		where: { email }
	});
	if (!user) {
		return false;
	}
	return bcrypt.compare(password, user.password);
}

export { authenticateUserLocal };