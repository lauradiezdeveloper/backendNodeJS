import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    messageTime: {
        type: Date,
        default: Date.now,
    } 
})

export const chatModel = model('messages', chatSchema);