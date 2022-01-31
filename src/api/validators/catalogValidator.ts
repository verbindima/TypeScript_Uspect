import { celebrate, Segments, Joi } from 'celebrate'

export default {
  create: celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        title: Joi.string().required().min(2).max(128),
        description: Joi.string().min(3).max(256).required(),
        type: Joi.string().required(),
        price: Joi.number().precision(2).min(1).required(),
      })
      .unknown(),
  }),
  get: celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().min(1).default(10),
      page: Joi.number().min(1).default(1),
      type: Joi.string().min(3).max(30).default('All'),
    },
  }),

  getDelOne: celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        title: Joi.string().min(2).max(128),
        description: Joi.string().min(3).max(256),
        type: Joi.string(),
        price: Joi.number().precision(2).min(1),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
}
