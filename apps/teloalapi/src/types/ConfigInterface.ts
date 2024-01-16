type CronConfig = {
  /** Cron pattern to use. See https://github.com/kelektiv/node-cron#cron-patterns */
  cronTime: string;

  /** Whether this cron is enabled or not. */
  enable: boolean;
};

export type ConfigInterface = {
  prod: boolean;
  host: string | undefined;
  port: number;

  al: {
    url: string;
    token: string | undefined;
  };

  auth: {
    bcryptRounds: number;
    pepper: string;

    recaptcha: {
      siteKey: string | null;
      secretKey: string | null;
    };
  };

  mongo: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };

  disableAllCrons: boolean;

  crons: {
    gameDataFetcher: CronConfig;
  };

  /** Below are things provided by the module itself */
  util: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  get: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  has: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
