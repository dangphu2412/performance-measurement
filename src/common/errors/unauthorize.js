import { UNAUTHORIZED } from 'http-status';
import { ERROR_CODE } from '../enum';
import { Error } from './base';

export class UnAuthorizedException extends Error {
    constructor(msg = 'You need to sign in') {
        super({
            message: msg,
            code: ERROR_CODE.TOKEN_INVALID,
            status: UNAUTHORIZED
        });
    }
}
