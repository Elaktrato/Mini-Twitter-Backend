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


module.exports = { getAllMessages, getMessageById, getUserById }