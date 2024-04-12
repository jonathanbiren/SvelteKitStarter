import ldapClient from '$lib/ldap';
import ldapts from 'ldapts';

export async function authenticateUserLDAP(
	uid: string,
	password: string
): Promise<{ valid: boolean; commonName: string }> {
	try {
		//* Given that we do not know the exact LDAP directory that the user is in, we will search the entire LDAP tree using the root directory as the base, and the uid as the filter
		const searchBase = 'dc=unibw-muenchen,dc=de';
		const searchOptions: ldapts.SearchOptions = {
			scope: 'sub',
			filter: `(uid=${uid})`
		};

		const searchResult = await ldapClient.search(searchBase, searchOptions);
		if (searchResult.searchEntries.length === 0) {
			console.log('User not found in LDAP');
			return {
				valid: false,
				commonName: ''
			}
			
		} else {
			//* Given that the uid is unique we can assume that the array will only have one element
			const dn: string = searchResult.searchEntries[0].dn;
			//Here we are extracting the common name of the user in order
			//to perform the seach on the CMS using the common name
			let cn =  searchResult.searchEntries[0].cn;
			cn = convertToString(cn);
			console.log("Common name is: " + cn);
			await ldapClient.bind(dn, password);
			console.log('LDAP authentication successful');
			await ldapClient.unbind();
			return {
				valid: true,
				commonName: cn
			};
		}
	} catch (error) {
		console.log('Error authenticating user with LDAP: ', error);
		return {
			valid: false,
			commonName: ''
		};
	}
}


//This function is simply used to convert the common name that is returend by the LDAP search to a string
function convertToString (value: string | string[] | Buffer | Buffer[]): string {
	if (typeof value === 'string') {
		return value;
	} else if (value instanceof Buffer) {
		return value.toString();
	} else if (Array.isArray(value)) {
		if (value.length > 0 && value[0] instanceof Buffer) {
			return value.map(buffer => buffer.toString()).join('');
		} else {
			return value.join('');
		}
	}
	return '';
}
