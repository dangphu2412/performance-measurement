// @ts-check
import { RequestFormatter } from '../../../base/RequestFilter/RequestFormatter';
import { UserRepository } from '../repository';
import { UserDetail } from '../dto/userDetail.dto';
import { DuplicateException, InternalServerException, NotFoundException } from '../../../common/errors';
import { logger, BcryptService } from '../../../common/utils';
import { getTransaction } from '../../../database';

class Service {
    /**
     * @type {UserRepository}
     */
    repository;

    /**
     * @type {BcryptService}
     */
    bcryptService;

    constructor(repository) {
        this.repository = repository;
        this.bcryptService = BcryptService;
    }

    findAll(query) {
        const formattedQuery = new RequestFormatter(query);
        return this.repository.findAll(formattedQuery).execute();
    }

    async upsertOne(body, id = 0) {
        const dto = new UserDetail(body);
        const isSuccess = true;
        const isEmailPresent = this.repository.isEmailPresent(dto.email);
        const transaction = await getTransaction();

        try {
            // Insert
            if (!id || id === 0) {
                if (await isEmailPresent) {
                    return new DuplicateException('This email has been used');
                }

                dto.password = this.bcryptService.hash(dto.password);

                await this.repository.insert(dto.toJson(), transaction);
            } else {
                // Update
                const updateObject = {};
                const currentUser = await this.repository.findOneById(id);

                if (!currentUser) {
                    return new NotFoundException('Not found user to update');
                }

                if (dto.email !== currentUser.email) {
                    if (await isEmailPresent) {
                        return new DuplicateException('This email has been used');
                    }
                    updateObject.email = dto.email;
                }
                if (dto.username !== currentUser.username) {
                    updateObject.username = dto.username;
                }
                if (!this.bcryptService.compare(dto.password, currentUser.password)) {
                    updateObject.password = this.bcryptService.hash(dto.password);
                }

                await this.repository.update(updateObject, transaction);
            }
        } catch (error) {
            await transaction.rollback();
            logger.error(error.message);
            return new InternalServerException(error.message);
        }
        await transaction.commit();
        return isSuccess;
    }
}

export const UserService = new Service(UserRepository);
