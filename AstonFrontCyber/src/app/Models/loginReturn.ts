export class loginReturn
{
    token : string;
    expiresAt : Date;
    constructor(token : string, expiresAt : Date)
    {
        this.token = token;
        this.expiresAt = expiresAt;
    }
}