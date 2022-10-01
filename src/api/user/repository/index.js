import { KnexRepositoryBase } from '../../../base/KnexRepositoryBase';

class Repository extends KnexRepositoryBase {
    findOneByEmail(email) {
        return this.query().select('*').where({ email }).first();
    }

    isEmailPresent(email) {
        return this.findOneByEmail(email)
            .clear('select').select('id');
    }
}

export const UserRepository = new Repository('users');
