import { NOT_FOUND } from 'http-status';
import { ERROR_CODE } from '../enum';
import { Error } from './base';

export class NotFoundException extends Error {
    constructor(msg = 'Not found') {
        super({
            message: msg,
            code: ERROR_CODE.NOT_FOUND,
            status: NOT_FOUND
        });
    }
}
