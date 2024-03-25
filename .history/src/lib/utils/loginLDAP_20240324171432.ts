import ldapClient from "$lib/ldap";

export async function authenticateUserLDAP(email: string, password: string): Promise<boolean> {
        try {
        await ldapClient.bind(`cn=${email},`, password);
        ldapClient.unbind();
        return true;
    } catch (error) {
        console.log("Error authenticating user with LDAP: ", error);
        return false;
    }    
}