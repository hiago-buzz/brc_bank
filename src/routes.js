const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const AuthorizationController = require('./controllers/AuthorizationController');
const AccountController = require('./controllers/AccountController');       

const routes = express.Router();

routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        cpfCnpj: Joi.string().required(),
        password: Joi.string().required()
    })
}), AuthorizationController.authenticate);

// CONTAS

routes.post('/account', celebrate({
    [Segments.BODY]: Joi.array().items(
        Joi.object().keys({
            cpfCnpj: Joi.string().required(),
            bank: Joi.string().required(),
            account_number: Joi.string().required(),    
            agency: Joi.string().required(),
            digit: Joi.string().required()
        })
    )
}), AccountController.create);

routes.get('/account/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), AccountController.show);                

routes.put('/account/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({        
        bank: Joi.string().required(),
        account_number: Joi.string().required(),
        agency: Joi.string().required(),
        digit: Joi.string().required()
    })
}), AccountController.update);

routes.delete('/account/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), AccountController.delete);


module.exports = routes;