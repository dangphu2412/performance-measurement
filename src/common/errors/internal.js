import { INTERNAL_SERVER_ERROR } from 'http-status';
import { ERROR_CODE } from '../enum';
import { Error } from './base';

export class InternalServerException extends Error {
    constructor(msg = 'Internal server error') {
        super({
            message: msg,
            code: ERROR_CODE.INTERNAL,
            status: INTERNAL_SERVER_ERROR
        });
    }
}
