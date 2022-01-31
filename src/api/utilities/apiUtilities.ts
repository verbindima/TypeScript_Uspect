import { Request } from 'express'
import multer from 'multer'
import { v4 } from 'uuid'

const uuid = v4()

const extractCookieFromRequest = (req: Request) => {
  if (req.cookies.accessToken) {
    const { accessToken } = req.cookies
    return { accessToken }
  }
  if (req.cookies.refreshToken) {
    const { refreshToken } = req.cookies
    return { refreshToken }
  }
  return null
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/')
  },
  filename: function (req, file, cb) {
    const extArr = file.originalname.split('.')
    const extension = '.' + extArr[extArr.length - 1]
    const fileName = uuid + extension
    cb(null, fileName)
  },
})
const upload = multer({ storage: storage })

export { extractCookieFromRequest, upload }
