import { injectable } from "tsyringe";
import { UsersModel } from "../Database/Models/UsersModel.infrastructure.database.models";
import { UserEntity } from "../../Domain/Entities/UserEntity.domain.entities";
import { IUserRepository } from "../../Domain/Repositories/IUserRepository.domain.repositories";

@injectable()
export class UserRepository implements IUserRepository {
  async create (user: UserEntity): Promise<UserEntity|string> {
    return new Promise((resolve) => {
      UsersModel.create({ ...user })
        .then((user) => resolve(user as unknown as UserEntity))
        .catch((error) => {
          console.error("ERROR UserRepository - create", error);

          if (String(error.errors[0].message) === "email must be unique") {
            resolve("email-already-exists");
          }

          resolve("error-create-user");
        });
    });
  }

  async findByEmail(email: string): Promise<any|string> {
    return new Promise((resolve) => {
      UsersModel.findOne({ where: { email } })
        .then((user) => resolve(user as unknown as UserEntity))
        .catch((error) => {
          console.error("ERROR UserRepository - findByEmail", error);
          resolve("error-find-user-by-email");
        });
    });
  }

  async update(id: string, user: UserEntity): Promise<UserEntity|string> {
    return new Promise((resolve) => {
      UsersModel.update({ ...user }, { where: { id }, returning: true })
        .then((user) => resolve(user as unknown as UserEntity))
        .catch((error) => {
          console.error("ERROR UserRepository - update", error);

          if (String(error.errors[0].message) === "email must be unique") {
            resolve("email-already-exists");
          }

          resolve("error-update-user");
        });
    });
  }

  async delete(id: string): Promise<string> {
    return new Promise((resolve) => {
      UsersModel.destroy({ where: { id } })
        .then(() => resolve("success-delete-user"))
        .catch((error) => {
          console.error("ERROR UserRepository - delete", error.errors[0].message);
          resolve("error-delete-user");
        });
    });
  }
}
