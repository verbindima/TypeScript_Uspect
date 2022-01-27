import { celebrate, Segments, Joi } from 'celebrate'

  
       export default {
        create: celebrate({
            [Segments.BODY]: Joi.object().keys({
              userId: Joi.number().required().min(1),
              pizzeriaId: Joi.number().required(),
              itemList: Joi.array().items(Joi.object().keys({
                  catalog: Joi.number().required(),
                  count: Joi.number().required(),
              })).required(),
            }).unknown(),
          }),
        get: celebrate({
            [Segments.QUERY]: {
              limit: Joi.number().min(1).default(10),
              page: Joi.number().min(1).default(1),
              pizzeria: Joi.number().default(0)
            },
          }),
          getDelOne: celebrate({
            [Segments.PARAMS]: {
              id: Joi.number().required(),
            },
          }),
          update: celebrate({ 
            [Segments.BODY]: Joi.object().keys({
              summ: Joi.number().precision(2),
              discount: Joi.number().precision(2),
              updatedAt: Joi.date().default(new Date()),
            }).unknown(),
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
          })
      }