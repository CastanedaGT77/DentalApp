export class CreateUserDto {
    firstName: string;
	lastName: string;
	password: string;
	email: string;
	role: number;
	allowBranchView: boolean
}