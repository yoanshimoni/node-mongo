const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    version_id: {
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
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = { TodoModel: mongoose.model("Todo", todoSchema) }