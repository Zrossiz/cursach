import { CreateUserDTO, LoginUserDTO } from "../dto/user.js";
import UserRepository from "../repository/user.js";
import { Prisma } from "../generated/prisma/client.js";
import { UserAlreadyExistsError, UserInvalidLoginOrPassword } from "../errors/user.error.js";
import bcrypt from "bcrypt";
import { Config } from "../config/index.js";
import * as jwt from 'jsonwebtoken';

class UserService {
    private readonly userRepository: UserRepository;
    private readonly cfg: Config;
    constructor(userRepo: UserRepository, appCfg: Config) {
        this.userRepository = userRepo
        this.cfg = appCfg
    }

    async register(payload: CreateUserDTO) {
        try {
            const hashedPassword = this.hashPassword(payload.password);

            await this.userRepository.create(payload.email, hashedPassword)
        } catch (err) {
            if (
                err instanceof Prisma.PrismaClientKnownRequestError &&
                err.code === "P2002"
            ) {
                throw new UserAlreadyExistsError();
            }
            throw err;
        }
    }

    async login(payload: LoginUserDTO): Promise<string> {
        try {
            const user = await this.userRepository.getByEmail(payload.email);
            if (!user) {
                throw new UserInvalidLoginOrPassword();
            }

            if (!this.verifyPassword(payload.password, user?.password)) {
                throw new UserInvalidLoginOrPassword();
            }

            return this.generateJWTKey(user.id, user.email);
        } catch (err) {
            throw err;
        }
    }

    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 3)
    }

    verifyPassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash)
    }

    generateJWTKey(id: string, email: string): string {
        const dataToSign = {
            sub: id,
            email
        }
        return jwt.sign(dataToSign, this.cfg.JWT_SECRET, {
            expiresIn: "1h"
        })
    }
}

export default UserService;