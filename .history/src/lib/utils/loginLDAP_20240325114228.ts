import ldapClient from '$lib/ldap';
import ldapts
export async function authenticateUserLDAP(uid: string, password: string): Promise<boolean> {
	try {
        const searchBase = 'dc=unibw-muenchen,dc=de';
        const searchOptions: ldapts.SearchOptions = {
            scope: 'sub',
            filter: `(uid=${uid})`
        };

        const searchResult = await ldapClient.search(searchBase, searchOptions);



		await ldapClient.bind(`uid=${uid},ou=people,dc=unibw-muenchen,dc=de`, password);
		await ldapClient.unbind();
		console.log('LDAP authentication successful');
		return true;
	} catch (error) {
		console.log('Error authenticating user with LDAP: ', error);
		return false;
	}
}
