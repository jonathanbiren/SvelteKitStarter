import ldapClient from "$lib/ldap";

export async function authenticateUserLDAP(uid: string, password: string): Promise<boolean> {
        try {
        //It is important to note that the the email variable will hold the RZ-Kennung
        //if the local authentication fails, not the and e-mail address
        await ldapClient.bind(`uid=${uid},dc=unibw-muenchen,dc=de`, password);
        await ldapClient.unbind();
        console.log('LDAP authentication successful');
        return true;
    } catch (error) {
        console.log("Error authenticating user with LDAP: ", error);
        return false;
    }    
}