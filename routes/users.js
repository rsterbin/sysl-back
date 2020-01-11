const express = require('express');
const validator = require('validator');

const postgres = require('../lib/pgAdapter.js');
const prmUsers = require('../lib/prmUsers.js');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {

    // Connect
    const client = await postgres.connect();

    // Fetch the users
    const fetUsrs = await prmUsers.fetchUsers(client);
    if (fetUsrs.users) {
        res.json({ data: fetUsrs.users });
    } else {
        res.status(500).json({ error: 'Internal server error happened: ' + fetUsrs.error });
    }

});

/* POST users create */
router.post('/', async (req, res, next) => {
    console.log(req.body);

    // Check email
    if (!req.body.email) {
        res.status(400).json({ error: 'Email is required' });
        return;
    }

    // Validate email
    if (!validator.isEmail(req.body.email)) {
        res.status(400).json({ error: 'Email "' + req.body.email + '" is invalid' });
        return;
    }

    // Stuff that needs to catch errors
    try {

        // Connect
        const client = await postgres.connect();

        // Check pronouns
        var pronouns_id = null;
        if (req.body.pronouns_id) {
            const verProId = await prmUsers.verifyPronounsId(client, req.body.pronouns_id);
            if (!verProId.pronouns_id) {
                client.release();
                res.status(verProId.status).json({ error: 'Pronoun ID "' + req.body.pronouns_id + '" not found: ' + verProId.error });
                return;
            } else {
                pronouns_id = verProId.pronouns_id;
            }
        } else if (req.body.pronouns) {
            const verPros = await prmUsers.lookupPronounsId(client, req.body.pronouns);
            if (!verPros.pronouns_id) {
                client.release();
                res.status(verPros.status).json({ error: 'Pronouns "' + req.body.pronouns + '" not found: ' + verPros.error });
                return;
            } else {
                pronouns_id = verPros.pronouns_id;
            }
        }
        req.body.pronouns_id = pronouns_id;

        // Run the insert and return the new ID
        const insUser = await prmUsers.insertUser(client, req.body);
        if (insUser.user_id) {
            res.json({ data: insUser.user_id });
        } else {
            res.status(500).json({ error: 'Internal server error happened: ' + insUser.error });
        }

    } catch (e) {
        next(e);
    }

});

module.exports = router;
