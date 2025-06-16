import { UserEntity } from "../Entities/UserEntity.domain.entities";

export class UserFactory {
  private static validate(data: UserEntity): boolean | string {
    if (!data.name) {
      return "Name is required";
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.name)) {
      return "Name can only contain letters and spaces";
    }

    if (!data.email) {
      return "Email is required";
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
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

  static save (data: UserEntity): UserEntity {
    if (typeof this.validate(data) === "string") {
      throw new Error(this.validate(data) as string);
    }

    return new UserEntity(
      data.name,
      data.email,
      data.password,
      data.createdAt,
      data.updatedAt,
      data.id,
    );
  }
}