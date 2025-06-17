import { injectable, inject } from "tsyringe";
import { IUserContract } from "../Contracts/IUserContract.application.contracts";
import { IJwtContext } from "../../Presentation/Http/Types/IJwtContextType.presentation.http.types";
import CryptoJS from "crypto-js";
import argon2 from "argon2";

interface IUserService extends IUserContract {}

@injectable()
export class AuthService {
  constructor(
    @inject("IUserAuthContract")
      private readonly user: IUserService
  ) {}

  async login(email: string, password: string, context: IJwtContext): Promise<any> {
    try {
      const responseRepository = await this.user.findByEmail(email);
      if (responseRepository === "error-find-client-by-email") throw new Error("Houve um erro ao tentar buscar o cliente pelo email");

      if (!responseRepository) {
        return {
          codigo: 404,
          message: "Usuário não encontrado",
        }
      }

      const PASSWORD_ACTUAL = responseRepository.data.password as string;
  
      if (!PASSWORD_ACTUAL) throw new Error("Houve um erro ao tentar buscar a senha do usuário");
      const VALIDATE_PASSWORD = await argon2.verify(String(PASSWORD_ACTUAL), password);

      if (!VALIDATE_PASSWORD) {
        return {
          codigo: 401,
          message: "Email ou senha incorreto",
        }
      }

      const HASH = CryptoJS.AES.encrypt(
        email, 
        String(process.env.APPLICATION_SECRET_KEY)
      ).toString();

      const { security } = context;
      const TOKEN = await security.sign(
        { HASH },
        String(process.env.APPLICATION_SECRET_KEY),
        { expiresIn: "8h", secret: String(process.env.APPLICATION_REFRESH_SECRET_KEY) }
      );



      return {
        codigo: 200,
        message: "Login realizado com sucesso",
        data: {
          token: TOKEN,
        }
      }
    } catch (error) {
      console.error("ERROR AuthService - login", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar fazer login",
      }
    }
  }
}