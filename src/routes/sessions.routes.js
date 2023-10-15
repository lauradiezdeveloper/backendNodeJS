import { Router } from "express";
import { userModel } from "../models/users.model.js";
import session from "express-session";

const sessionsRouter = Router();

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if(req.session.login){
            res.status(200).send({response: "User already logged in"})
        }
        const user = await userModel.findOne({ email: email });
            if(user){
                if(user.password == password){
                    req.session.login = true;
                    res.redirect('/api/products');
                }else{
                    res.status(401).send({response: "Wrong password", message: password})
                }
            }else{
                res.status(404).send({response: "User not found", message: user})
            }
    }catch(error){
        res.status(400).send({response: 'Error', message: error.message});
    }
});


sessionsRouter.get('/logout', (req, res) => {
    if(req.session.login){
        req.session.destroy();
        res.redirect('/api/login');
    }else{
        res.redirect('/api/login')
    }
    
});




export default sessionsRouter;