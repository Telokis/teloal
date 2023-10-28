type CronConfig = {
  /** Cron pattern to use. See https://github.com/kelektiv/node-cron#cron-patterns */
  cronTime: string;

  /** Whether this cron is enabled or not. */
  enable: boolean;
};

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

  export const disableAllCrons: boolean;

  export const crons: {
    gameDataFetcher: CronConfig;
  };
}
