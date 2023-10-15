import { Router } from "express";
import { userModel } from "../models/users.model.js";

const userRouter = Router()


userRouter.get('/', async (req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).send({response: 'OK', message: users})
        } catch(error){
            res.status(400).send({response: 'Error', message: error})
        }
    })

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        if (user) {
            res.status(200).send({response: 'OK', message: user })
        } else {
            res.status(404).send({response: 'Error finding user', message: 'User not found' })
        }
    } catch (error) {
        res.status(400).send({response: 'Error finding user', message: error })
    }
})

userRouter.post('/', async (req, res) => {
	const {firstname, lastname, age, email, password} = req.body
	try {
		const resp = await userModel.create({firstname, lastname, age, email, password})
		res.status(200).send({response: 'OK', message: resp})
	} catch(error){
		res.status(400).send({response: 'Error', message: error})
	}
})

userRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const {firstname, lastname, age, email, password} = req.body
    try {
        const user = await userModel.findByIdAndUpdate(id, {firstname, lastname, age, email, password})
        if (user) {
            res.status(200).send({response: 'OK', message: user })
        } else {
            res.status(404).send({response: 'Error updating user', message: 'User not found' })
        }
    } catch (error) {
        res.status(400).send({response: 'Error updating user', message: error })
    }
})

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
            res.status(200).send({response: 'OK', message: user })
        } else {
            res.status(404).send({response: 'Error deleting user', message: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({response: 'Error deleting user', message: error })
    }
})


export default userRouter