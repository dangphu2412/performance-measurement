import { CREATED, OK } from 'http-status';
import { UserService } from '../service';
import { Error } from '../../../common/errors/base';
import { logger } from '../../../common/utils';
import { InternalServerException } from '../../../common/errors';

class Controller {
    /**
     * @type {UserService}
     */
    service;

    constructor(service) {
        this.service = service;
    }

    findAll = async (req, res) => {
        let data;
        try {
            data = await this.service.findAll(req.query);
        } catch (err) {
            data = new InternalServerException(err.message);
            logger.error(err.message);
        }
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
    }

    createOne = async (req, res) => {
        const data = req.body;
        const error = await this.service.upsertOne(data);

        if (error instanceof Error) {
            const { status, message, code } = error;
            return res.status(status).json({
                message,
                code,
                status
            });
        }
        return res.status(CREATED).json({
            status: OK,
            message: 'Created',
        });
    }

    updateOne = async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        const error = await this.service.upsertOne(data, id);
        if (error instanceof Error) {
            const { status, message, code } = error;
            return res.status(status).json({
                message,
                code,
                status
            });
        }
        return res.status(CREATED).json({
            status: OK,
            message: 'Updated',
        });
    }
}

export const UserController = new Controller(UserService);
