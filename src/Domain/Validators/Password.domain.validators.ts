export class Password {
  private readonly password: string;

  constructor(password: string) {
    if (!password) {
      throw new Error("Password is required and cannot be empty.");
    }

    if (String(password).length < 8) {
      throw new Error("Min 8 characters");
    }

    this.password = password;
  }

  getValue(): string {
    return this.password;
  }
}