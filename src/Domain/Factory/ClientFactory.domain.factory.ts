import { ClientEntity } from "../Entities/ClientEntity.domain.entities";

export class ClientFactory {
  private static validate(data: ClientEntity): boolean | string {
    // Name validations
    if (!data.name) {
      return "Name is required";
    }
    if (data.name.length < 3) {
      return "Name must have at least 3 characters";
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.name)) {
      return "Name can only contain letters and spaces";
    }

    if (!data.email) {
      return "Email is required";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      return "Invalid email format";
    }

    if (!data.password) {
      return "Password is required";
    }

    if (data.password.length < 8) {
      return "Password must have at least 8 characters";
    }

    return true;
  }

  static create(data: ClientEntity): ClientEntity {
    if (typeof this.validate(data) === "string") {
      throw new Error(this.validate(data) as string);
    }

    return new ClientEntity(
      data.name,
      data.email,
      data.password,
      data.createdAt,
      data.updatedAt,
      data.id,
    );
  }
}