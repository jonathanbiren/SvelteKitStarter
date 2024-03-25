import ldapClient from '$lib/ldap';

export async function authenticateUserLDAP(uid: string, password: string): Promise<boolean> {
	try {
		await ldapClient.bind(`uid=${uid},ou=cnfluence-users,dc=unibw-muenchen,dc=de`, password);
		await ldapClient.unbind();
		console.log('LDAP authentication successful');
		return true;
	} catch (error) {
		console.log('Error authenticating user with LDAP: ', error);
		return false;
	}
}
