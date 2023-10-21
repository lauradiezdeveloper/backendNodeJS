import { Router } from "express";
import passport from 'passport';

const sessionsRouter = Router();

sessionsRouter.post('/login', passport.authenticate('login'), async (req, res) => {
    try{
        if(req.user){
            return res.status(401).send({response: 'Invalidate user'})
        }
        req.session.user = {
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            age: req.user.age,
            email: req.user.email,
        }
        res.status(200).send({playload: req.user, response: 'User logged in'})
    }catch(error){
        res.status(500).send({response: 'Error initializing session', message: error})
    }
});

sessionsRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try{
        if(req.user){
            return res.status(400).send({response: 'User already exists'})
        }
        res.status(200).send({response: 'User registered'})
    }catch(error){
        res.status(500).send({response: 'Error registering user', message: error})
    }
});

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }),  async (req, res) => {
    res.status(200).send({response: 'User registered'})
});

sessionsRouter.get('/githubCallback', passport.authenticate('github'),  async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({response: 'User logged in'})
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