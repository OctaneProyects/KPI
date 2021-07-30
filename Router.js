var Request = require("request");
//var url = 'http://localhost:8000/api'
//var url = 'https://portal.grupoeco.com.mx/sirexa/api/'
var url = 'https://portal.grupoeco.com.mx/KPIApi/api/'
// asdasd
class Router {

    constructor(App) {

        this.GetGastos(App);

    }

    GetGastos(App) {

        App.post('/GetGastos', (req, res) => {

            try {

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}GetZonas?Opc=1`,
                   // body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });

    }
}

module.exports = Router;