import ldap from '$lib/ldap';


export async function authenticateUserLDAP(email: string, password: string): Promise<boolean> {
        try {
        await ldap.bind(email, password);
        return true;
    } catch (error) {
        return false;
    }    
}