const {getUsers} = require('./controllers')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

app.get('/messages', (req, res) => {
    res.send('not implemented yet')
})

app.get('/messages/:id', (req, res) => {
    res.send('not implemented yet')
})

app.get('/users', async (req, res) => {
    res.send(await getUsers())
})

app.get('/users/:id', (req, res) => {
    res.send('not implemented yet')
})

app.listen(PORT, () => {
    console.log("API running on " + PORT)
})