import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const usersModel = model('users', userSchema)