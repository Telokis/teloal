declare module "config" {
  export const prod: boolean;
  export const host: string | undefined;
  export const port: number;

  export const al: {
    url: string;
    token: string | undefined;
  };

  export const mongo: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
}
