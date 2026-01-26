export class Config {
    readonly JWT_SECRET: string;
    readonly APP_ADDRESS: string;
    readonly ALLOWED_ORIGIN: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET ?? "";
        this.APP_ADDRESS = process.env.APP_ADDRESS ?? "";
        this.ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? ""
        this.validate();
    }

    validate() {
        if (this.JWT_SECRET == "") {
            throw new Error("JWT_SECRET is empty")
        }
        if (this.APP_ADDRESS == "") {
            throw new Error("APP_ADDRESS is empty")
        }
        if (this.ALLOWED_ORIGIN == "") {
            throw new Error("ALLOWED_ORIGINis empty")
        }
    }
}