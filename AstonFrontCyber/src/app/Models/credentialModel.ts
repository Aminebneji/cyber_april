export class CredentialModel {

    email : string;
    password : string;
    constructor(email : string, password : string, rememberMe : boolean = false) {
        this.email = email;
        this.password = password;
    }
}
