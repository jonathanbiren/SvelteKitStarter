//This file will hold the single instance of the ldap client that will be used to interact with the LDAP server.

//url: ldap.unibw.de
//port: 636

import { Client } from 'ldapts';

//Is
const ldapClient = new Client({
	url: 'ldaps://ldap.unibw.de:636'
});

export default ldapClient;
