import { Router } from "express";
import { userModel } from "../models/users.models.js";

const userRouter = Router()

userRouter.get('/', async (req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).send({response: 'OK', message: users})
        } catch(error){
            res.status(400).send({response: 'Error', message: error})
        }
    })

userRouter.get('/', async (req, res) => {
	try {
		const users = await userModel.find()
		res.status(200).send({response: 'OK', message: users})
	} catch(error){
		res.status(400).send({response: 'Error', message: error})
	}
})

userRouter.post('/', async (req, res) => {
	const {nombre, apellido, edad, email, password} = req.body
	try {
		const resp = await userModel.create({nombre, apellido, edad, email, password})
		res.status(200).send({response: 'OK', message: users})
	} catch(error){
		res.status(400).send({response: 'Error', message: error})
	}
})

userRouter.post('/', async (req, res) => {
	const {nombre, apellido, edad, email, password} = req.body
	try {
		const resp = await userModel.create({nombre, apellido, edad, email, password})
		res.status(200).send({response: 'OK', message: users})
	} catch(error){
		res.status(400).send({response: 'Error', message: error})
	}
})

userRouter.post('/', async (req, res) => {
	const {nombre, apellido, edad, email, password} = req.body
	try {
		const resp = await userModel.create({nombre, apellido, edad, email, password})
		res.status(200).send({response: 'OK', message: users})
	} catch(error){
		res.status(400).send({response: 'Error', message: error})
	}
})

export default userRouter