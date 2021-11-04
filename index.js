const express = require('express');
const cors = require('cors');
const {getMessageById} = require('./controllers')

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

app.get('/messages', (req, res) => {
    res.send('not implemented yet')
})

app.get('/messages/:id', async (req, res) => {
    try {
        const result = await getMessageById(req.params.id)
        res.status(200).send(result)
    }
    catch (err) {
        res.status(406).send(err)
    }
})

app.get('/users', (req, res) => {
    res.send('not implemented yet')
})

app.get('/users/:id', (req, res) => {
    res.send('not implemented yet')
})

app.listen(PORT, () => {
    console.log("API running on " + PORT)
})