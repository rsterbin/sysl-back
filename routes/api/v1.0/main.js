const express = require('express');
const Router = require('express-promise-router');

const gamesRouter = require('./games.js');
const pronounsLogic = require('../../../logic/pronouns.js');

const router = new Router();

const db = require('../../../database');

// index GET: What is this?
router.get('/', function(req, res, next) {
    res.json({ msg: 'This is version 1.0 of the Swing Yer Sword Left API' });
});

// pronouns GET: Find our known pronouns so we can prep them for display as needed
router.get('/pronouns', async function (req, res, next) {
    const found = await pronounsLogic.getMap();
    res.json(found);
});

router.use('/games', gamesRouter);

module.exports = router;
