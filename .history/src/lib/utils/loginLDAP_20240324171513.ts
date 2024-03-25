import ldapClient from "$lib/ldap";

export async function authenticateUserLDAP(email: string, password: string): Promise<boolean> {
        try {
        //It is important to note that the the email variable will hold the RZ-Kennung
        //if the local a
        await ldapClient.bind(`cn=${email},dc=unibw-muenchen,dc=de`, password);
        ldapClient.unbind();
        return true;
    } catch (error) {
        console.log("Error authenticating user with LDAP: ", error);
        return false;
    }    
}