import { ProductEntity } from "../Entities/ProductEntity.domain.entities";
import { Name } from "../Validators/Name.domain.validators";
import { Price } from "../Validators/Price.domain.validators";
import { Description } from "../Validators/Description.domain.validators";
import { ID } from "../Validators/ID.domain.validators";

export class ProductFactory {
  static save (props: ProductEntity): ProductEntity {
    const NAME = new Name(props.name);
    const DESCRIPTION = new Description(props.description);
    const PRICE = new Price(props.price);
    const CATEGORY_ID = new ID(props.categoryId);

    return new ProductEntity(
      NAME.getValue(),
      PRICE.getValue(),
      DESCRIPTION.getValue(),
      CATEGORY_ID.getValue(),
      props.image
    );
  }
}