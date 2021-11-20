export const type = "postgres";
export const host = process.env.DB_HOST || "localhost";
export const username = process.env.DB_USER || "postgres";
export const password = process.env.DB_PASSWORD || "root";
export const database = process.env.DB_NAME || "uspect_test";
export const charset = "utf8";
export const synchronize = true;
export const entities = [
  "src/entity/**/*.ts",
  // '**/**.entity.js'
];
export const logging = true;
export const migrations = ["src/migration/**/*.ts"];
export const cli = {
  migrationsDir: "migration",
};
export const connectTimeout = 30000;
export const acquireTimeout = 30000;
