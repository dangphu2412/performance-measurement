// @ts-check
import { LoginDto } from '../dto';
import { UserRepository } from '../../user/repository';
import { UnAuthorizedException } from '../../../common/errors';
import { BcryptService, JwtService } from '../../../common/utils';

class Service {
    /**
     * @type {UserRepository}
     */
    userRepository;

    /**
     * @type {BcryptService}
     */
    bcryptService;

    /**
     * @type {JwtService}
     */
    jwtService;

    /**
     * @param  {UserRepository} repo
     */
    constructor(repo) {
        this.userRepository = repo;
        this.bcryptService = BcryptService;
        this.jwtService = JwtService;
    }

    async login(body) {
        const dto = new LoginDto(body);
        const user = await this.userRepository.findOneByEmail(dto.email);

        if (!user || !this.bcryptService.compare(dto.password, user.password)) {
            return new UnAuthorizedException('Your username or password is not correct');
        }

        return this.getResponseInfo(user);
    }

    getResponseInfo(dto) {
        const { password, ...info } = dto;

        const token = this.jwtService.sign({ userId: info.id });
        return {
            token,
            info
        };
    }
}

export const AuthService = new Service(UserRepository);
