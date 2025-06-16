import { CategoryEntity } from "../Entities/CategoryEntity.domain.entities";
import { Name } from "../Validators/Name.domain.validators";
import { Description } from "../Validators/Description.domain.validators";

export class CategoryFactory {
  static save (props: CategoryEntity) {
    const NAME = new Name(props.name);
    const DESCRIPTION = new Description(props.description);

    return new CategoryEntity(
      NAME.getValue(),
      DESCRIPTION.getValue()
    );
  } 
}
