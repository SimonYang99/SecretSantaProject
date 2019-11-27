const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const runQuery = async (query, param) => {
    const client = await pool.connect();
    try {
        const res = await client.query(query, param);
        return res;
    } finally {
        client.release();
    }
};

const create_user = async (username, email, room) => {
    await runQuery(`INSERT INTO users (name, email, room) values ($1, $2, $3);`, [username, email, room]);
    return;
};

const get_users = async (room) => {
    return await runQuery(`SELECT name, email FROM users where room = $1`, [room]);

};

module.exports = {
    create_user,
    get_users
};