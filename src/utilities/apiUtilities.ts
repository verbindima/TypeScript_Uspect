import {  Request } from 'express';

const extractCookieFromRequest = (req: Request) => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    }
    if (req.cookies.accessToken) {
      const { accessToken } = req.cookies
      return accessToken;
    }
    return null;
  };
  export{
      extractCookieFromRequest
  }
  