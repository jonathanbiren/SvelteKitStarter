import ldapClient from '$lib/ldap';
uid=j0bj0316,ou=people,dc=2020,dc=INF,dc=Studenten,dc=unibw-muenchen,dc=de

export async function authenticateUserLDAP(uid: string, password: string): Promise<boolean> {
	try {





		await ldapClient.bind(`uid=${uid},ou=people,dc=unibw-muenchen,dc=de`, password);
		await ldapClient.unbind();
		console.log('LDAP authentication successful');
		return true;
	} catch (error) {
		console.log('Error authenticating user with LDAP: ', error);
		return false;
	}
}
