const {users} = require('./usersDb')
const {messages} = require('./messagesDb')

async function getMessageById(ident) {
    const message = messages.find(m => m.id.toString() === ident.toString())
    return message
}

module.exports = {getMessageById}