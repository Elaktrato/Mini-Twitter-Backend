const {users} = require('./usersDb')
const {messages} = require('./messagesDb')

async function getUsers() {
    // const users = await db.query('SELECT ${columns:name} FROM ${table:name}', {
    //     columns: ['id', 'title', 'description'],
    //     table: 'books'
    // });
    console.log(users)

    return users
}




module.exports = {getUsers}
