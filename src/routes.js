const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const AuthorizationController = require('./controllers/AuthorizationController');
const AccountController = require('./controllers/AccountController');       
const UserController = require('./controllers/UserController');

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

// USUARIOS

routes.post('/user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        cpfCnpj: Joi.string().required(),   
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        image: Joi.string().required(),
        password: Joi.string().required()
    })
}), UserController.create); 

routes.get('/user/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), UserController.show);

routes.put('/user/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({    
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        image: Joi.string().required(),
        password: Joi.string().required()
    })
}), UserController.update); 

routes.delete('/user/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), UserController.delete);



module.exports = routes;