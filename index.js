const express = require('express');
const cors = require('cors');
const { getAllMessages, getSingleUser } = require('./controllers');

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

app.get('/messages/:id', (req, res) => {
    res.send('not implemented yet')
})

app.get('/users', (req, res) => {
    res.send('not implemented yet')
})

app.get('/users/:id', async(req, res) => {
    try {
        return res.send(await getSingleUser(req.params.id))
    } catch (err) {
        return res.status(400).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log("API running on " + PORT)
})