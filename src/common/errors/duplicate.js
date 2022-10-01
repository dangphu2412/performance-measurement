import { CONFLICT } from 'http-status';
import { ERROR_CODE } from '../enum';
import { Error } from './base';

export class DuplicateException extends Error {
    constructor(msg = 'Duplicate record') {
        super({
            message: msg,
            code: ERROR_CODE.DUPLICATE,
            status: CONFLICT
        });
    }
}
