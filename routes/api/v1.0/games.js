const express = require('express');
const Router = require('express-promise-router');

const db = require('../../../database');

const router = new Router();

// games/:slug/:uuid GET: Pull up all info for the game in question
router.get('/:slug/:uuid', async function(req, res, next) {
    const sth1 = await db.query(`
        SELECT p.char_full_name, p.char_short_name, p.player_name,
            p.char_pronouns_id, i.url, p.color, p.is_dm
        FROM players p
        JOIN games g USING (game_id)
        JOIN icons i USING (icon_id)
        WHERE g.slug = $1 AND g.uuid = $2`,
        [ req.params.slug, req.params.uuid ]
    );
    const players = sth1.rows;
    const sth2 = await db.query(`
        SELECT e.full_name, e.short_name, i.url, e.color, e.dm_only
        FROM game_events e
        JOIN games g USING (game_id)
        JOIN icons i USING (icon_id)
        WHERE g.slug = $1 AND g.uuid = $2`,
        [ req.params.slug, req.params.uuid ]
    );
    const events = sth2.rows;
    res.json({ success: true, data: { players: players, events: events } });
});

module.exports = router;
