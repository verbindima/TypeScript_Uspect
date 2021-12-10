import {  Request } from 'express';

const extractCookieFromRequest = (req: Request) => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    }
    if (req.cookies.accessToken) {
      const { accessToken } = req.cookies
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
  