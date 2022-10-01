import { CREATED } from 'http-status';
import { AuthService } from '../service';
import { Error } from '../../../common/errors/base';
import { logger } from '../../../common/utils';

class Controller {
    /**
     * @type {AuthService}
     */
    service;

    constructor(service) {
        this.service = service;
    }

    login = async (req, res, next) => {
        try {
            const data = await this.service.login(req.body);
            if (data instanceof Error) {
                const { status, message } = data;
                return res.status(status).json({
                    message,
                    status
                });
            }
            return res.status(CREATED).json({
                status: CREATED,
                data,
            });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    }
}

export const AuthController = new Controller(AuthService);
