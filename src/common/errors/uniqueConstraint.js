import { CONFLICT } from 'http-status';
import { ERROR_CODE } from '../enum';
import { Error } from './base';

export class UniqueConstraintException extends Error {
    constructor(msg = 'Error reference constraint') {
        super({
            message: msg,
            code: ERROR_CODE.UNIQUE_CONSTAINT,
            status: CONFLICT
        });
    }
}
