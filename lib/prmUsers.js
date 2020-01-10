module.exports = {

fetchUsers: (client) => (
    new Promise((resolve, reject) => {
        client.query(`
            SELECT
                u.user_id, u.email, u.first, u.last, u.address1, u.address2, u.city,
                u.region, u.postal_code, u.country, u.occupation, u.employer,
                p.subject || '/' || p.object AS pronouns
            FROM users u
            JOIN pronouns p USING (pronouns_id)
        `)
        .then(res => {
            var fetched = [];
            for (var i = 0; i < res.rows.length; ++i) {
                fetched.push(res.rows[i]);
            }
            resolve({ users: fetched });
        })
        .catch(err => {
            console.log(err.stack);
            resolve({ error: err, status: 500 });
        })
    })
),

verifyPronounsId: (client, pronouns_id) => (
    new Promise((resolve, reject) => {
        client.query(`
            SELECT pronouns_id
            FROM pronouns
            WHERE pronouns_id = $1
        `, [ pronouns_id ])
        .then(res => {
            if (res.rows.length < 1) {
                resolve({ error: 'No such pronouns ID was found', status: 400 });
            } else {
                resolve(res.rows[0]);
            }
        })
        .catch(err => {
            console.log(err.stack);
            resolve({ error: err, status: 500 });
        })
    })
),

lookupPronounsId: (client, pronouns) => (
    new Promise((resolve, reject) => {
        client.query(`
            SELECT pronouns_id
            FROM pronouns
            WHERE subject || '/' || object = LOWER($1)
        `, [ pronouns ])
        .then(res => {
            if (res.rows.length < 1) {
                resolve({ error: 'No such pronoun set was found', status: 400 });
            } else {
                resolve(res.rows[0]);
            }
        })
        .catch(err => {
            console.log(err.stack);
            resolve({ error: err, status: 500 });
        })
    })
),

insertUser: (client, userData) => (
    new Promise((resolve, reject) => {
        var cols = [ 'email' ];
        var vals = [ '$1' ];
        var binds = [ userData.email ];
        var columns = [ 'first', 'last', 'address1', 'address2', 'city',
            'region', 'postal_code', 'country', 'pronouns_id', 'occupation',
            'employer' ];
        var index = 2;
        for (var i = 0; i < columns.length; ++i) {
            var col = columns[i];
            if (userData[col]) {
                cols.push(col);
                vals.push('$' + index);
                binds.push(userData[col]);
                ++index;
            }
        }
        const sql = 'INSERT INTO users (' + cols.join(', ') + ') VALUES (' + vals.join(', ') + ') RETURNING user_id';
        console.log(sql);
        client.query(sql, binds)
        .then(res => {
            if (res.rows.length < 1) {
                resolve({ error: 'The user was not inserted', status: 500 });
            } else {
                resolve(res.rows[0]);
            }
        })
        .catch(err => {
            console.log(err.stack);
            resolve({ error: err, status: 500 });
        })
    })
)

};
