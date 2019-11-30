const { Pool } = require("pg");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET);

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
    await runQuery(`INSERT INTO users (name, email, room) values ($1, $2, $3);`, [username, cryptr.encrypt(email), room]);
    return;
};

const delete_room = async (room) => {
    console.log(room);
    return await runQuery(`DELETE FROM users WHERE room = $1`, [room]);
};

const get_users = async (room) => {
    let info = await runQuery(`SELECT name, email FROM users where room = $1`, [room]);
    let decrypt_info = [];
    for(let i = 0 ; i < info.rows.length; i++){
        info.rows[i].email = cryptr.decrypt(info.rows[i].email);
    }
    return info;
};

module.exports = {
    create_user,
    get_users,
    delete_room
};