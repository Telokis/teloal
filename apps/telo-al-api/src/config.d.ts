declare module "config" {
  export const prod: boolean;
  export const host: string | undefined;
  export const port: number;

  export const al: {
    url: string;
    token: string | undefined;
  };
}
