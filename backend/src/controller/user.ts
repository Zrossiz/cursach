import { Response, Request } from "express";
import UserService from "../service/user.js";
import { Logger } from "winston";
import { CreateUserDTO, LoginUserDTO } from "../dto/user.js";
import { UserAlreadyExistsError, UserInvalidLoginOrPassword } from "../errors/user.error";

class UserController {
    private readonly userService: UserService;
    private readonly log: Logger;
    

    constructor(userService: UserService, log: Logger) {
        this.userService = userService
        this.log = log
    }

    register = async (req: Request, res: Response) => {
        try {
            const body: CreateUserDTO = req.body;

            if (!body.email || !body.password) {
              return res.status(400).json({ message: "invalid payload" });
            }

            const token = await this.userService.register(body);

            let options = {
                maxAge: 1000 * 60 * 15, 
                httpOnly: true, 
            }

            return res.cookie('access_token', token, options).send()
        } catch (err) {
            if (err instanceof UserAlreadyExistsError) {
                return res.status(409).json({
                    message: err.message
                })
            }
            this.log.error("register user error", err)
            return res.status(500).json({
                message: "internal server error"
            })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const body: LoginUserDTO = req.body;

            const token = await this.userService.login(body);

            let options = {
                maxAge: 1000 * 60 * 15, 
                httpOnly: true, 
            }

            return res.cookie('access_token', token, options).send();
        } catch (err) {
            if (err instanceof UserInvalidLoginOrPassword) {
                return res.status(401).json({
                    message: err.message
                })
            }
            this.log.error("register user error", err)
            return res.status(500).json({
                message: "internal server error"
            })
        }
    }
}

export default UserController;