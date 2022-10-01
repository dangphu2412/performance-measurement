import { BcryptService } from '../../../common/utils';

export class LoginDto {
    /** @type {string} */
    username;

    /** @type {string} */
    pwd;

    constructor({ username, pwd }) {
        this.username = username;
        this.pwd = pwd;
    }

    toJson() {
        return {
            username: this.username,
            pwd: this.pwd
        };
    }

    comparePwd(pwdFromDb) {
        return BcryptService.compare(this.pwd, pwdFromDb);
    }
}
