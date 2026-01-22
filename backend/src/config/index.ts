export class Config {
    readonly JWT_SECRET: string;
    readonly APP_ADDRESS: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET ?? "";
        this.APP_ADDRESS = process.env.APP_ADDRESS ?? "";
        this.validate();
    }

    validate() {
        if (this.JWT_SECRET == "") {
            throw new Error("jwt secret is empty")
        }
        if (this.APP_ADDRESS == "") {
            throw new Error("app address is empty")
        }
    }
}