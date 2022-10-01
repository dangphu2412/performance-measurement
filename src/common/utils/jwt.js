import { sign, decode } from 'jsonwebtoken';
import { JWT_SECRET, EXPPIRE_DAYS } from '../../env';
import { logger } from './winston';

class Jwt {
    constructor(secret, expiresIn) {
        this.secret = secret;
        this.expiresIn = expiresIn;
        logger.info('initiate Jwt module');
    }

    sign(payload) {
        return sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
    }

    decode(token) {
        return decode(token);
    }
}

export const JwtService = new Jwt(JWT_SECRET, EXPPIRE_DAYS);
