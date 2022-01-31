import request from 'supertest'
import app from '../index'

describe('POST /api/users/register', () => {
  describe('given a email, password, role, name, surname etc', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/api/users/register').send({
        email: 'test123454321@gmail.com',
        password: '111',
        isAdmin: false,
        name: 'Ivan',
        surname: 'Ivanov',
        city: 'NN',
        address: 'KOLOTUSKINA 15',
        phone: '+79958999924',
        birthday: '27.01.1994',
      })
      expect(response.statusCode).toBe(200)
    })
    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/api/users/register').send({
        email: 'test123454321@gmail.com',
        password: '111',
        isAdmin: false,
        name: 'Ivan',
        surname: 'Ivanov',
        city: 'NN',
        address: 'KOLOTUSKINA 15',
        phone: '+79958999924',
        birthday: '27.01.1994',
      })
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      )
    })
    test('response has userData', async () => {
      const response = await request(app).post('/api/users/register').send({
        email: 'test123454321@gmail.com',
        password: '111',
        isAdmin: false,
        name: 'Ivan',
        surname: 'Ivanov',
        city: 'NN',
        address: 'KOLOTUSKINA 15',
        phone: '+79958999924',
        birthday: '27.01.1994',
      })
      expect(response.body.userData).toBeDefined()
    })
  })

  describe('when keys is missing', () => {
    test('should respond with a status code of 400', async () => {
      const bodyData = [
        { email: 'test123454321@gmail.com' },
        { password: '111' },
        { isAdmin: false },
        { name: 'Ivan' },
        { surname: 'Ivanov' },
        { city: 'NN' },
        { address: 'KOLOTUSKINA 15' },
        { phone: '+79958999924' },
        { birthday: '27.01.1994' },
        {},
      ]
      for (const body of bodyData) {
        const response = await request(app)
          .post('/api/users/register')
          .send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })
})

describe('POST /api/users/auth', () => {
  describe('given a email and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/api/users/auth').send({
        email: 'verbindima@mail.ru',
        password: '111',
      })
      expect(response.statusCode).toBe(200)
    })
    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/api/users/auth').send({
        email: 'verbindima@mail.ru',
        password: '111',
      })
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      )
    })
    test('response has userId', async () => {
      const response = await request(app).post('/api/users/auth').send({
        email: 'verbindima@mail.ru',
        password: '111',
      })
      expect(response.body.userData).toBeDefined()
    })
  })

  describe('when the username and password is missing', () => {
    test('should respond with a status code of 400', async () => {
      const bodyData = [
        { email: 'verbindima@mail.ru' },
        { password: '111' },
        {},
      ]
      for (const body of bodyData) {
        const response = await request(app).post('/api/users/auth').send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })
})
