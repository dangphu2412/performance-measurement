import { BcryptService } from '../../../common/utils';

export class RegisterDto {
    /** @type {string} */
    username;

    /** @type {string} */
    fullName;

    /** @type {string} */
    pwd;

    constructor({ username, pwd, fullName }) {
        this.username = username;
        this.fullName = fullName;
        this.pwd = pwd;
    }

    toJson() {
        this.beforeInsert();
        return {
            username: this.username,
            pwd: this.pwd,
            fullName: this.fullName
        };
    }

    beforeInsert() {
        this.pwd = BcryptService.hash(this.pwd);
    }
}
