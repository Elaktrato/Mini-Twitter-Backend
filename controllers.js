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

async function getMessageById(ident) {
  const message = messages.find((m) => m.id.toString() === ident.toString());
  return message;
}

async function addMessage(message) {
  const newMessage = {
    id: message.id || messages.length + 1,
    text: message.text || "No message text",
    date: message.date || "No message date",
    id_user: message.id_user || "No user id",
    picture_url: message.picture_url || "https://placedog.net/200",
  };
  const result = messages.push(newMessage);
  return getMessageById(newMessage.id);
}

async function getAllMessages() {
  const result = await db.query(`
    select messages.id, message, date, messages.image_url 
    from messages 
    left join users 
    on users.id = messages.id_user`);
  return result;
}

async function getUserById(id) {
  const user = users.find((u) => u.id.toString() === id.toString());
  return user;
}

async function createUser(userData) {
  const newUser = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    image_url: userData.image_url,
  };
  if (newUser) {
    users.push(newUser);
  }
  return newUser;
}

async function getUsers() {
  const users = await db.query("Select id user_id, name username, email, image_url profile_picture from users"
  );
  console.log(users);

  return users;
}

module.exports = {
  getAllMessages,
  getMessageById,
  getUserById,
  createUser,
  addMessage,
  getUsers,
};
