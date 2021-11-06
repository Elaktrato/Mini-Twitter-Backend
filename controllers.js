const { users } = require('./usersDb')
const { messages } = require('./messagesDb')

async function getMessageById(ident) {
    const message = messages.find(m => m.id.toString() === ident.toString())
    return message
}

async function addMessage(message) {
    const newMessage = {
        id: message.id || messages.length + 1,
        text: message.text || 'No message text',
        date: message.date || 'No message date',
        id_user: message.id_user || 'No user id',
        picture_url: message.picture_url || 'https://placedog.net/200'
    }
    const result = messages.push(newMessage)
    return getMessageById(newMessage.id)
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


module.exports = { getAllMessages, getMessageById, getUserById, createUser, addMessage }