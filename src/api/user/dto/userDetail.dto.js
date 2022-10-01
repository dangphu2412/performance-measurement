export class UserDetail {
    username;

    email;

    password;

    constructor({
        username, email, password
    }) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    toJson() {
        return {
            username: this.username,
            email: this.email,
            password: this.password
        };
    }
}
