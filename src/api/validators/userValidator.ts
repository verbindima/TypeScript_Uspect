import { celebrate, Segments, Joi } from 'celebrate'

export default {
  register: celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().min(3).required(),
        isAdmin: Joi.boolean().default(false),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        city: Joi.string().required().default('Moscow'),
        address: Joi.string().required(),
        phone: Joi.string().min(3).required(),
        birthday: Joi.string().required(),
      })
      .unknown(),
  }),

  auth: celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().min(3).required(),
      })
      .unknown(),
  }),
  update: celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string().email(),
        password: Joi.string().min(3).max(255),
        isAdmin: Joi.boolean().default(false),
        name: Joi.string(),
        surname: Joi.string(),
        city: Joi.string().default('Moscow'),
        address: Joi.string(),
        phone: Joi.string().min(3),
        birthday: Joi.date(),
      })
      .unknown(),
  }),
  getOrders: celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().min(1).default(10),
      page: Joi.number().min(1).default(1),
      userId: Joi.number().required(),
    },
  }),
}
