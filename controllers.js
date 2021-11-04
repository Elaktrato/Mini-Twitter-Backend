const { users } = require('./usersDb')
const { messages } = require('./messagesDb')

async function getMessageById(ident) {
    const message = messages.find(m => m.id.toString() === ident.toString())
    return message
}

async function addMessage(message) {
    const newMessage = {
        id: message.id || messages.length+1,
        text: message.text || 'No message text',
        date: message.date || 'No message date',
        id_user: message.id_user || 'No user id',
        picture_url: message.picture_url || 'https://placedog.net/200'
    }
    const result = messages.push(newMessage)
    return getMessageById(newMessage.id)
}


async function getAllMessages() {
    // let jsonResponse = { error: "unknown" };
    // try {
    //     const response = {...messages }
    //     if (response.ok) {
    //         jsonResponse = await response.json()
    //         console.log(response.json())
    //     }
    // } catch (err) {
    //     console.log(err);
    //     jsonResponse.error = err.message
    // }
    // return jsonResponse
    return messages
}

async function getSingleUser(id) {
    const userIndex = users.findIndex((element) => element === id);
    console.log(userIndex)
    return userIndex
}


module.exports = { getAllMessages, getMessageById, getSingleUser, addMessage }