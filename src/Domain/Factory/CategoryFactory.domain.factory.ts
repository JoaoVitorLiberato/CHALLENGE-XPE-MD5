import { CategoryEntity } from "../Entities/CategoryEntity.domain.entities";

export class CategoryFactory {
  private static validate (data: CategoryEntity): string|boolean {
    if (!data.name) {
      return "Name is required";
    }

    if (!data.description) {
      return "Description is required";
    }

    return false;
  }

  static save (data: CategoryEntity) {
    if (typeof this.validate(data) === "string") {
      throw new Error(this.validate(data) as string);
    }

    return new CategoryEntity(
      data.name,
      data.description,
      new Date(),
      new Date(),
      data.id
    );
  } 
}
