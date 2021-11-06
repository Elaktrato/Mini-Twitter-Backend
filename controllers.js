const { users } = require("./usersDb");
const { messages } = require("./messagesDb");

const pgp = require("pg-promise")();
const dotenv = require("dotenv").config();

console.log(process.env.DATABASE_URL);

let db;
if (process.env.DATABASE_URL) {
    db = pgp({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
} else {
    const username = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;

    let uri = `postgres://${username}:${password}@${host}:${port}/${process.env.DB}`;
    console.log(uri);

    db = pgp({
        connectionString: uri,
        ssl: { rejectUnauthorized: false },
    });
}


async function getMessageById(id) {
    const message = await db.one(
        `SELECT users.name username, messages.message, messages.date, messages.image_url, messages.id message_id
        FROM messages
        LEFT JOIN users ON users.id = messages.id_user 
        WHERE messages.id = $1;`, [id]
    );
    return message;
}

async function addMessage(message) {
    const userID = message.user_id
    const checkForUser = await db.query(`SELECT TRUE FROM users WHERE users.id = $1`, [userID])

    if (checkForUser && message.message !== "") {
        const newMessage = {
            message: message.message,
            id_user: message.user_id,
            image_url: message.image_url || 'https://placedog.net/200'
        }
        const result = await db.one('INSERT INTO messages(${this:name}) VALUES(${this:csv}) RETURNING id', newMessage)
        return getMessageById(result.id)
    }
    return error;
}

async function getAllMessages(query) {
    let pageNumber = query.page;
    let result;

    if (pageNumber) {
        let messageRows = query.rows || 10
        let pageRowOffset = ((pageNumber - 1) * messageRows)

        result = await db.query(`
    select users.name username, users.id user_id, messages.id message_id, message, date, messages.image_url 
    from messages 
    left join users 
    ON users.id = messages.id_user
    OFFSET $1 ROWS
    LIMIT $2;`, [pageRowOffset, messageRows])
        return result;
    } else {
        result = await db.query(`
    select users.name username, users.id user_id, messages.id message_id, message, date, messages.image_url 
    from messages 
    left join users 
    ON users.id = messages.id_user`)
        return result;
    }

}

async function getUserById(id) {
    const result = await db.one(
        `
            SELECT id user_id, name username, email, users.image_url profile_picture FROM users WHERE users.id = $1;
            `, [id]);
    return result;
}

async function createUser(userData) {
    const newUser = {
        name: userData.username,
        email: userData.email,
        password: userData.password,
        image_url: userData.profile_picture || 'https://placedog.net/200'
    }
    const result = await db.one('INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING id', newUser)
    return getUserById(result.id);
}

async function getUsers() {
    const users = await db.query("Select id user_id, name username, email, image_url profile_picture from users");
    console.log(users);

    return users;
}

async function getUserMessages(id) {
    let result = await db.query(
        `
            SELECT users.name username, users.id user_id, messages.id message_id, message, date, messages.image_url FROM messages LEFT JOIN users ON users.id = messages.id_user WHERE users.id = $1 AND messages.id_user = $1 `, [id]);
    return result;

}

async function getRandomUser() {
    const result = await db.query(`
            SELECT * FROM users ORDER BY random() LIMIT 1;
            `)
    return result
}

async function deleteUserMessages(id) {
    await db.query("DELETE FROM messages WHERE messages.id = $1", [id])
    return true;
}

module.exports = { getAllMessages, getMessageById, getUserById, createUser, addMessage, getUsers, getUserMessages, getRandomUser, deleteUserMessages }