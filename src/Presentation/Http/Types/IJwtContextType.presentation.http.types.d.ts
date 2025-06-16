import { Context } from "elysia";

export interface IJwtContext extends Context {
  security: {
    sign: (payload: any, secret: string, options: any) => Promise<string>;
    verify: (token: string) => Promise<boolean | null>;
  };
}
