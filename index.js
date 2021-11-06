const { getUsers } = require('./controllers')
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { getAllMessages, getUserById, getMessageById, createUser, addMessage, getUserMessages, getRandomUser, deleteUserMessages } = require('./controllers');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/messages', async(req, res) => {
    try {
        return res.send(await getAllMessages(req.query))
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

app.delete('/messages/:id', async(req, res) => {
    try {
        const result = await deleteUserMessages(req.params.id)
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
    } catch (err) {
        res.status(406).send(err)
    }
})

app.get('/users', async(req, res) => {
    res.send(await getUsers())
})

app.post('/users', async(req, res) => {
    res.send(await createUser(req.body))
})

app.get('/users/:id', async(req, res) => {
    try {
        return res.send(await getUserById(req.params.id))
    } catch (err) {
        return res.status(400).send(err.message)
    }
})

app.get('/users/:id/messages', async(req, res) => {
    // res.send('not implemented yet')
    try {
        return res.send(await getUserMessages(req.params.id))
    } catch (err) {
        return res.status(400).send(err.message)
    }
})

app.get('/me', async(req, res) => {
    try {
        return res.send(await getRandomUser())
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log("API running on " + PORT)
})