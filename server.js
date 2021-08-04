const express = require('express');
const App = express();
const path = require('path');
const session = require('express-session');
const Router = require('./Router')
const dotenv = require('dotenv')
const request = require('request-promise');
var cors = require('cors')
var url = 'https://portal.grupoeco.com.mx/KPIApi/api/'

const PORT = process.env.PORT || 5000;
var userSession = '';
dotenv.config({ path: './config/config.env' })


App.use(cors())

App.use(express.static(path.join(__dirname, './client/build')));

App.use(express.json());

App.use(session({
    key: 'userSession',
    secret: 'none',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (2000000),
        httpOnly: false
    }
}));

new Router(App);

App.get('/setSession/:uid', async function (req, res) {
    const { uid } = req.params;
    try {
        const response = await request(`${url}ValidaAcceso/?uId=${uid}`);

        req.session.User = JSON.parse(JSON.parse(response))[0];

        res.json(JSON.parse(JSON.parse(response))[0]);

    } catch (error) {
        res.json(error);
    }

});

App.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


App.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
