var express = require('express');

var corsHeaders = function(req, res, next) {

    if (!req.originalUrl.match('^/api')) {
        return next();
    }

    const prod_origin = 'TODO: GET PROD DOMAIN';
    const dev_origins = [ 'http://localhost:3000', 'http://localhost:3001', 'http://localhost2:3001' ];
    let origin = req.get('origin');
    let ok = true;
    if (!dev_origins.includes(origin) && origin !== prod_origin) {
        origin = prod_origin;
        ok = false;
    }
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        if (ok) {
            next();
        } else {
            res.status(403);
            res.json({ msg: 'Access is restricted' });
        }
    }
};

module.exports = corsHeaders;
