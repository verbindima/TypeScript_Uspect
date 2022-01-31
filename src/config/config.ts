import * as path from 'path'
const envDir = path.join(__dirname, '../../.env')
import * as dotenv from 'dotenv'
dotenv.config({ path: envDir })

const {
  HTTP_PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  API_URL,
  CLIENT_URL,
} = process.env

export default {
  PORT: HTTP_PORT, // || 5050,
  jwtAccessKey: JWT_ACCESS_SECRET || 'testsecret',
  jwtRefreshKey: JWT_REFRESH_SECRET || 'testsecret',
  HOST: SMTP_HOST,
  USER: SMTP_USER,
  SMTP_PORT: SMTP_PORT,
  PASSWORD: SMTP_PASSWORD,
  API: API_URL,
  CLIENT: CLIENT_URL,
}
