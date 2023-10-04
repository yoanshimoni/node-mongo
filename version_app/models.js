const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = { TodoModel: mongoose.model("Todo", todoSchema) }