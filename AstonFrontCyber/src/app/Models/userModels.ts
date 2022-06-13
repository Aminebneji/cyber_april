export class userModels
{
    //Id/FirstName/LastName/Username/Email/PhoneNumber/HashPass/SaltPass/Role/CreatedAt/UpdatedAt
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    HashPass: string;
    SaltPass: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, firstName: string, lastName: string, username: string, email: string, phoneNumber: string, hashPass: string, saltPass: string, role: UserRole, createdAt: Date, updatedAt: Date)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.HashPass = hashPass;
        this.SaltPass = saltPass;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export enum UserRole
{
    Admin ,
    Manager ,
    Employee ,
    User 
}