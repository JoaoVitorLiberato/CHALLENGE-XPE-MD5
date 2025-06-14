import { Context } from "elysia";

export type JwtContext = Context & {
  security: {
    sign: (payload: any) => string;
    verify: (token: string) => Promise<boolean | null>;
  };
};
