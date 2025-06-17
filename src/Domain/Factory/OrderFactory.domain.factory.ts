import { OrderEntity } from "../Entities/OrderEntity.domain.entities";
import { Status } from "../Validators/Status.domain.validators";
import { Price } from "../Validators/Price.domain.validators";
import { ID } from "../Validators/ID.domain.validators";

export class OrderFactory {
  static save (props: OrderEntity) {
    const CLIENT_ID = new ID(props.clientId);
    const STATUS = new Status(props.status);
    const TOTAL = new Price(props.total);

    return new OrderEntity(
      CLIENT_ID.getValue(),
      STATUS.getValue(),
      TOTAL.getValue(),
      props.items,
    );
  }
}
