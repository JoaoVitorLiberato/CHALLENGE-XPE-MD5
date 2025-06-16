import { ClientEntity } from "../Entities/ClientEntity.domain.entities";
import { Name } from "../Validators/Name.domain.validators";

export class ClientFactory {
  static save (props: ClientEntity): ClientEntity {
    const NAME = new Name(props.name)

    return new ClientEntity(
      NAME.getValue(),
    );
  }
}