import { CreateUserDTO, LoginUserDTO } from "../dto/user";
import UserRepository from "../repository/user";
import { Prisma } from "@prisma/client";
import { UserAlreadyExistsError, UserInvalidLoginOrPassword } from "../errors/user.error";
import bcrypt from "bcrypt";
import { Config } from "../config";
import * as jwt from 'jsonwebtoken';

class UserService {
    private readonly userRepository: UserRepository;
    private readonly cfg: Config;
    constructor(userRepo: UserRepository, appCfg: Config) {
        this.userRepository = userRepo
        this.cfg = appCfg
    }

    async register(payload: CreateUserDTO): Promise<string> {
        try {
            const hashedPassword = this.hashPassword(payload.password);

            const userId = await this.userRepository.create(payload.email, hashedPassword);

            return this.generateAccessToken(userId, payload.email);
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
        const user = await this.userRepository.getByEmail(payload.email);
        if (!user) {
            throw new UserInvalidLoginOrPassword();
        }

        if (!this.verifyPassword(payload.password, user?.password)) {
            throw new UserInvalidLoginOrPassword();
        }

        return this.generateAccessToken(user.id, user.email);
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 8)
    }

    private verifyPassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash)
    }

    private generateAccessToken(id: string, email: string): string {
        const dataToSign = {
            sub: id,
            email,
            id,
        }
        return jwt.sign(dataToSign, this.cfg.JWT_SECRET, {
            expiresIn: "1h"
        })
    }
}

export default UserService;