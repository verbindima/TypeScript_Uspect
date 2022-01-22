import { celebrate, Segments, Joi } from 'celebrate'

    export default{ create: celebrate({
          [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required().min(2).max(128),
            city: Joi.string().min(3).max(128).required(),
            address: Joi.string().max(256).required(),
          }).unknown(),
        }),
        get:   celebrate({
          [Segments.QUERY]: {
            limit: Joi.number().min(1).default(10),
            page: Joi.number().min(1).default(1),
            city: Joi.string().min(3).max(30).default('All')
          },
        }),
         getDelOne:
        celebrate({
          [Segments.PARAMS]: {
            id: Joi.number().required(),
          },
        }),
      update: celebrate({
          [Segments.BODY]: Joi.object().keys({
            title: Joi.string().min(2).max(128),
            city: Joi.string().min(3).max(128),
            address: Joi.string().max(256),
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
        })
      }