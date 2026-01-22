export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exists");
  }
}

export class UserInvalidLoginOrPassword extends Error {
  constructor() {
    super("Invalid login or email")
  }
}