var Request = require("request");
//ar url = 'http://localhost:9000/api/'
//var url = 'https://portal.grupoeco.com.mx/sirexa/api/'
var url = 'https://portal.grupoeco.com.mx/KPIApi/api/'
// asdasd
class Router {

    constructor(App) {

        this.GetZonas(App);
        this.GetSitios(App);
        this.GetVentas(App);
        this.GetGastos(App);


    }

    GetZonas(App) {

        App.post('/GetZonas', (req, res) => {

            const u = req.session.User;
            console.log(u);

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

    GetSitios(App) {

        App.post('/GetSitios', (req, res) => {

            try {

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}GetSitios?Opc=1`,
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

    GetVentas(App) {

        App.post('/GetVentas', (req, res) => {

            try {

                console.log(req.body.Opc);
                console.log(req.body.Zonas);
                console.log(req.body.Sitios);
                console.log(req.body.FechaF);
                console.log(req.body.FechaI);
                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}GetVentas?opc=${req.body.Opc}&Zonas=${req.body.Zonas}&Sitios=${req.body.Sitios}&FechaI=${req.body.FechaI}&FechaF=${req.body.FechaF}`,
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
    GetGastos(App) {

        App.post('/GetGastos', (req, res) => {

            try {

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}GetGastos`,
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