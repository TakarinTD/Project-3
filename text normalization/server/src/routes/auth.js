const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const axios = require('axios')
const { loginValidate, registerValidate } = require('../validations/auth');
const authController = require('../controllers/auth');

/* eslint-disable prettier/prettier */

let initRouter = (app) => {
    router.post('/auths/register', registerValidate, asyncMiddleware(authController.register));
    router.post('/auths/login', loginValidate, asyncMiddleware(authController.login));
    router.get('/auths/verify', auth, asyncMiddleware(authController.verifyAccessToken));
    
    router.post('/expand', async(req, res) => {
        try {
            let data2req = req.body
            let {data} = await axios.post('http://43.239.223.87:5050/expand', data2req)
            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send("Lỗi rồi :))")
        }
    })
    return app.use('/', router)
}

/* eslint-enable prettier/prettier */

module.exports = initRouter;
