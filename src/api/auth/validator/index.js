import joi from '@hapi/joi';
import { responseError } from '../../../common/utils';

export class Validator {
    loginValidate = () => {
        const schema = joi.object().keys({
            email: joi.string().trim().email().required(),
            password: joi.string().min(8).max(25).required()
        });
        return responseError(schema);
    }
}

export const AuthValidator = new Validator();
