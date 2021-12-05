import * as path from 'path'; 
const envDir = path.join(__dirname, '../../.env');
import * as dotenv from 'dotenv'
dotenv.config({ path: envDir })


const {
   HTTP_PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET
  } = process.env;
  
  export default {
    PORT: HTTP_PORT,// || 5050,
    jwtAccessKey: JWT_ACCESS_SECRET || "testsecret",
    jwtRefreshKey: JWT_REFRESH_SECRET || "testsecret"
  };
