
const db = require('../database');

const PronounsLogic = {

    getMap: async () => {
        const sth = await db.query(`
            SELECT pronouns_id, subject, object, possessive, determiner, reflexive
            FROM pronouns`
        );
        let pmap = {};
        let they = null;
        for (const row of sth.rows) {
            pmap[row.pronouns_id] = {
                subject: row.subject,
                object: row.object,
                possessive: row.possessive,
                determiner: row.determiner,
                reflexive: row.reflexive,
            };
            if (row.subject === 'they') {
                they = pmap[row.pronouns_id];
            }
        }
        return { success: true, data: { pronouns: pmap, default: they } };
    }

};

module.exports = PronounsLogic;
