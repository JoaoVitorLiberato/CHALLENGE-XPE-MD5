import argon2 from "argon2";
import { injectable } from "tsyringe";
import { UserUseCase } from "../UseCases/UserUseCase.application.usecases";
import { UserEntity } from "../../Domain/Entities/UserEntity.domain.entities";
import { IUserAuthContract } from "../Contracts/IUserAuthContract.application.contracts";

@injectable()
export class UserService implements IUserAuthContract {
  constructor(
    private readonly user: UserUseCase
  ) {}

  async create (data: UserEntity): Promise<any> {
    try {
      const PASSWORD_HASH = await argon2.hash(data.password);
      const responseRepository = await this.user.create({ ...data, password: PASSWORD_HASH });

      if (responseRepository === "error-create-user") throw new Error("Houve um erro ao tentar criar o usuário");
      if (responseRepository === "email-already-exists") {
        return {
          codigo: 400,
          message: "Email já está em uso",
        }
      }

      return {
        codigo: 200,
        message: "Usuário criado com sucesso",
        data: {
          id: (responseRepository as { id: string }).id,
        },
      }
    } catch (error) {
      console.error("ERROR UserService - create", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar criar o usuário",
      }
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const responseRepository = await this.user.findByEmail(email);

      if (responseRepository === "error-find-user-by-email") throw new Error("Houve um erro ao tentar buscar o usuário");

      if (!responseRepository) {
        return {
          codigo: 400,
          message: "Usuário não encontrado",
        }
      }

      return {
        codigo: 200,
        message: "Usuário encontrado com sucesso",
        data: responseRepository,
      }
    } catch (error) {
      console.error("ERROR UserService - findByEmail", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar buscar o usuário",
      }
    }
  }
}