import {  Request } from 'express';

const extractCookieFromRequest = (req: Request) => {
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization
      return accessToken;
    }
    if (req.cookies.refreshToken) {
      const { refreshToken } = req.cookies
      return refreshToken;
    }
    return null;
  };
  export{
      extractCookieFromRequest
  }
  