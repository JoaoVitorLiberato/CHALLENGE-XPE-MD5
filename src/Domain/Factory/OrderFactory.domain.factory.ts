import { OrderEntity } from "../Entities/OrderEntity.domain.entities";
import { Status } from "../Validators/Status.domain.validators";
import { Price } from "../Validators/Price.domain.validators";
import { Name } from "../Validators/Name.domain.validators";
import { ID } from "../Validators/ID.domain.validators";
import { Quantity } from "../Validators/Quantity.domain.validators";

export class OrderFactory {
  static save (props: OrderEntity) {
    const CLIENT_ID = new ID(props.clientId).getValue();
    const STATUS = new Status(props.status).getValue();
    const TOTAL = new Price(props.total).getValue();
    const ITEMS = props.items.map((item) => {
      const PRODUCT_ID = new ID(item.id).getValue();
      const QUANTITY = new Quantity(item.quantity).getValue();
      const PRICE = new Price(item.price).getValue();
      const NAME = new Name(item.name).getValue();
      return { id: PRODUCT_ID, quantity: QUANTITY, price: PRICE, name: NAME };
    });

    return new OrderEntity(
      CLIENT_ID,
      STATUS,
      TOTAL,
      ITEMS,
    );
  }
}
