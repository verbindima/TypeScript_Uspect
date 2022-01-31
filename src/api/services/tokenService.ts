import { Token } from '../entity/token.entity'
import jwt from 'jsonwebtoken'
import config from '../../config/config'
class TokenService {
  generateTokens(id: number, isAdmin: boolean) {
    const payload = {
      id,
      isAdmin,
    }
    const accessToken = jwt.sign(payload, config.jwtAccessKey, {
      expiresIn: '1h',
    })
    const refreshToken = jwt.sign(payload, config.jwtRefreshKey, {
      expiresIn: '14d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, config.jwtAccessKey)
      return userData
    } catch (e) {
      return null
    }
  }
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, config.jwtRefreshKey)
      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(user_Id: number, refreshToken: string) {
    const tokenData = await Token.findOne({ where: { user: user_Id } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = Token.create({
      refreshToken,
      user: {
        id: user_Id,
      },
    })
    await token.save()
    return token
  }
  async removeToken(refreshToken: string) {
    const tokenData = await Token.delete({ refreshToken })
    return tokenData
  }
  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken })
    return tokenData
  }
}
export default new TokenService()
