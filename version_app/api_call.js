const axios = require("axios")
const models = require('./models');

const versionUrl = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com`,
});

const getVersions = async () => {
    const res = await versionUrl.get('/todos/')
    const todos = await res.data
    const todosSliced = todos.slice(0, 5)
    console.log(todosSliced)
    for ({ id, title, completed } of todosSliced) {
        try {
            // Option 1
            const filter = { _id: id };
            const update = { title, completed };
            const options = { upsert: true, setDefaultsOnInsert: true };
            await models.TodoModel.findOneAndUpdate(filter, update, options);
            // // Option 2
            // const todo = new models.TodoModel({ _id: id, title, completed });
            // await todo.save();
        } catch (err) {
            console.log("cant save ", err)
            continue
        }
    };
}

module.exports = { getVersions }