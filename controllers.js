const { users } = require('./usersDb')
const { messages } = require('./messagesDb')

async function getMessageById(ident) {
    const message = messages.find(m => m.id.toString() === ident.toString())
    return message
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


module.exports = { getAllMessages, getMessageById, getSingleUser }