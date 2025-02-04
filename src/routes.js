const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const AuthorizationController = require('./controllers/AuthorizationController');


const routes = express.Router();

routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        cpfCnpj: Joi.string().required(),
        password: Joi.string().required()
    })
}), AuthorizationController.authenticate);


module.exports = routes;