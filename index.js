const express = require('express');
const cors = require('cors');
const { getAllMessages, getUserById, getMessageById, addMessage } = require('./controllers');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/messages', async(req, res) => {
    try {
        return res.send(await getAllMessages())
    } catch (err) {
        return res.status(400).send(err.message)
    }
})

app.get('/messages/:id', async(req, res) => {
    try {
        const result = await getMessageById(req.params.id)
        res.status(200).send(result)
    } catch (err) {
        res.status(406).send(err)
    }
})

app.post('/messages', async(req, res) => {
    try {
        const newMessage = req.body
        const result = await addMessage(newMessage)
        res.status(201).send(result)
    }
    catch (err) {
        res.status(406).send(err)
    }
})

app.get('/users', (req, res) => {
    res.send('not implemented yet')
})

app.get('/users/:id', async(req, res) => {
    try {
        return res.send(await getUserById(req.params.id))
    } catch (err) {
        return res.status(400).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log("API running on " + PORT)
})