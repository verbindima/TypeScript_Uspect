import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env` })


const {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET
  } = process.env;
  
  export default {
    db: {
      host: DB_HOST || 'localhost',
      user: DB_USER || 'postgres',
      password: DB_PASSWORD || 'root',
      nameBase: DB_NAME || 'test_Uspect'
    },
    PORT: PORT || 5050,
    jwtAccessKey: JWT_ACCESS_SECRET || "testsecret",
    jwtRefreshKey: JWT_REFRESH_SECRET || "testsecret"
  };
