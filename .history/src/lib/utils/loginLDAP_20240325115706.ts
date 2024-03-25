import ldapClient from '$lib/ldap';
import ldapts from 'ldapts';

export async function authenticateUserLDAP(uid: string, password: string): Promise<boolean> {
	try {
        //* Given that we do not know the exact LDAP directory that the user is in, we will search the entire LDAP tree using the root directory as the base, and the uid
		const searchBase = 'dc=unibw-muenchen,dc=de';
		const searchOptions: ldapts.SearchOptions = {
			scope: 'sub',
			filter: `(uid=${uid})`
		};

		const searchResult = await ldapClient.search(searchBase, searchOptions);
		if (searchResult.searchEntries.length === 0) {
			console.log('User not found in LDAP');
			return false;
		} else {
			//* Given that the uid is unique we can assume that the array will only have one element
			const dn: string = searchResult.searchEntries[0].dn;
			await ldapClient.bind(dn, password);
			console.log('LDAP authentication successful');
			await ldapClient.unbind();
			return true;
		}
	} catch (error) {
		console.log('Error authenticating user with LDAP: ', error);
		return false;
	}
}
