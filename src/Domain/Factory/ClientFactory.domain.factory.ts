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

    return true;
  }

  static save (data: ClientEntity): ClientEntity {
    if (typeof this.validate(data) === "string") {
      throw new Error(this.validate(data) as string);
    }

    return new ClientEntity(
      data.name,
      data.createdAt,
      data.updatedAt,
      data.id,
    );
  }
}