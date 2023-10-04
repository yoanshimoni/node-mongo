const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const apiCall = require("./api_call")
const models = require('./models');
const app = express()
const PORT = process.env.PORT || 8000
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/local"


mongoose.connect(MONGODB_URL)

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo");
});
mongoose.connection.on("error", (err) => {
    console.log(err);
});

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await models.TodoModel.find()
        res.json(todos);
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

setInterval(apiCall.getVersions, 10000);