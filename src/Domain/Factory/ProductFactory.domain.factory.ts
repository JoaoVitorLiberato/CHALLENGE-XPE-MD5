import { ProductEntity } from "../Entities/ProductEntity.domain.entities";

export class ProductFactory {
  private static validate (props: ProductEntity): string|boolean {
    if (!props.name) {
      return "Name is required";
    }
    if (!props.price) {
      return "Price is required";
    }
    if (!props.description) {
      return "Description is required";
    }
    if (!props.categoryId) {
      return "Category is required";
    }

    return true;
  }

  static save (props: ProductEntity): ProductEntity {
    if (typeof this.validate(props) === "string") {
      throw new Error(this.validate(props) as string);
    }

    return new ProductEntity(
      props.name,
      props.price,
      props.description,
      props.categoryId,
      props.image
    );
  }
}