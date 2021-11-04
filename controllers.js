const { users } = require('./usersDb')
const { messages } = require('./messagesDb')

async function getMessageById(ident) {
    const message = messages.find(m => m.id.toString() === ident.toString())
    return message
}


async function getAllMessages() {
    return messages
}

async function getUserById(id) {
    const user = users.find(u => u.id.toString() === id.toString())
    return user
}

async function createUser(userData) {
    const newUser = {
        id: users.length + 1,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image_url: userData.image_url
    }
    if (newUser) {
        users.push(newUser)
    }
    return newUser
}


module.exports = { getAllMessages, getMessageById, getUserById, createUser }