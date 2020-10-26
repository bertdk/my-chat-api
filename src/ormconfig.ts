import { ConnectionOptions } from "typeorm";

let config: ConnectionOptions = {
  type: "postgres",
  entities: [
    `${__dirname}/**/*.entity{.ts,.js}`,
    `${__dirname}/**/**/*.entity{.ts,.js}`,
  ],
  subscribers: [`${__dirname}/**/*.subscriber{.ts,.js}`],
  synchronize: false,
  migrations: [`${__dirname}/**/migrations/*{.ts,.js}`],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};

if (process.env.POSTGRES_INSTANCE) {
  config = {
    ...config,
    extra: {
      socketPath: `/cloudsql/${process.env.POSTGRES_INSTANCE}`,
    },
    port: null,
    host: `/cloudsql/${process.env.POSTGRES_INSTANCE}`,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.POSTGRES_SSL === true.toString(),
  };
} else {
  if (process.env.DATABASE_URL) {
    config = {
      ...config,
      url: process.env.DATABASE_URL,
    };
  } else {
    config = {
      ...config,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
    };
  }
}
export default config;
