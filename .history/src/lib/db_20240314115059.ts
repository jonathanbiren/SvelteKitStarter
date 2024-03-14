// I want to use this file to set up a mock database for the application. It should contain and array of user objects with the following properties: id, name, email, and password. I will also create a function to return the user object that matches the email and password passed to the function. I will then export the array of user objects and the function to be used in other parts of the application.


export interface UserSmall {
	id: number;
	email: string;
	name: string;
	password: string;
}

export const users: UserSmall[] = [
	{
		id: 1,
		email: 'julian.fietkau@unibw.de',
		name: 'Julian',
		password: '123'
	},
	{
		id: 2,
		email: 'laura.stojko@un'
		name: 'Laura',
		password: '123'
	}
];

export function authenticateUser(email: string, password: string): UserSmall | undefined {
    return users.find(user => user.name === email && user.password === password);
}; 