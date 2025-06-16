import { UserEntity } from "../Entities/UserEntity.domain.entities";
import { Name } from "../Validators/Name.domain.validators";
import { Email } from "../Validators/Email.domain.validators";
import { Password } from "../Validators/Password.domain.validators";

export class UserFactory {
  static save (props: UserEntity): UserEntity {
    const NAME = new Name(props.name);
    const EMAIL = new Email(props.email);
    const PASSWORD = new Password(props.password)

    return new UserEntity(
      NAME.getValue(),
      EMAIL.getValue(),
      PASSWORD.getValue(),
    );
  }
}