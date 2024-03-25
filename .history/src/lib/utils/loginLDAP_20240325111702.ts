import ldapClient from '$lib/ldap';

export async function authenticateUserLDAP(uid: string, password: string): Promise<boolean> {
	try {
        const searc

		await ldapClient.bind(`uid=${uid},ou=people,dc=unibw-muenchen,dc=de`, password);
		await ldapClient.unbind();
		console.log('LDAP authentication successful');
		return true;
	} catch (error) {
		console.log('Error authenticating user with LDAP: ', error);
		return false;
	}
}
