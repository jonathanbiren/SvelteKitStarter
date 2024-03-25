import ldap from '$lib/ldap';


export async function authenticateUserLDAP(email: string, password: string): Promise<boolean> {
        try {
        await ldap.bind(email, password);
        ldap.unbind();
        return true;
    } catch (error) {
        console.log("")
        return false;
    }    
}