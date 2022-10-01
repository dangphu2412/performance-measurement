import { BcryptService } from '../../../common/utils';

export class LoginDto {
    /** @type {string} */
    email;

    /** @type {string} */
    password;

    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }

    toJson() {
        return {
            email: this.email,
            password: this.password
        };
    }

    comparePwd(pwdFromDb) {
        return BcryptService.compare(this.password, pwdFromDb);
    }
}
