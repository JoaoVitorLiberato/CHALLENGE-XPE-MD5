import { Context } from "elysia";

export interface JwtContext extends Context {
  security: {
    sign: (payload: any) => string;
    verify: (token: string) => Promise<boolean | null>;
  };
}
