import { ItemsOrderEntity } from "../Entities/ItemsOrderEntity.domain.entities";
import { Quantity } from "../Validators/Quantity.domain.validators";
import { Price } from "../Validators/Price.domain.validators";
import { ID } from "../Validators/ID.domain.validators";

export class ItemsOrderFactory {
  static save (props: ItemsOrderEntity) {
    const ORDER_ID = new ID(props?.orderId || "");
    const PRODUCT_ID = new ID(props.productId);
    const QUANTITY = new Quantity(props.quantity);
    const PRICE = new Price(props.price);

    return new ItemsOrderEntity(
      PRODUCT_ID.getValue(),
      QUANTITY.getValue(),
      PRICE.getValue(),
      ORDER_ID.getValue(),
    );
  }
}
