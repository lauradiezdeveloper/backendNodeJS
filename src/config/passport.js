import local from 'passport-local';
import passport from 'passport';
import GithubStrategy from 'passport-github';
import {createHash, validatePassword } from '../utils/bcrypt';
import {userModel} from '../models/user';

const LocalStrategy = local.Strategy;

const initializaPassport = () => {  

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
    }, async (req, username, password, done) => {
        const {firstname, lastname, age, email, password} = req.body;
        try {
            const user = await userModel.findOne({email: email})
            if(user){
                return done(null, false); // User already exists
            }else{
                const passwordHash = createHash(password);
                const userCreated = await userModel.create({
                    firstname,
                    lastname,
                    age,
                    email,
                    password: passwordHash,
                })
                return done(null, userCreated);
            }
        }catch(error){
            return done(error);
        };
    }));

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'}, async (username, password, done) => {
            try{
                const user = await userModel.findOne({email: username});
                    if(!user){
                        return done(null, false); // User not found
                    }
                    if(validatePassword(password, user.password)){
                        return done(null, user); // Success
                    }
                    return done(null, false); // Wrong autentication
            }catch(error){
                return done(error);
            };
    }));

    passport.use(new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            const user = await userModel.findOne({email: profile._json.email});
            if(!user){
                const userCreated = await userModel.create({
                    firstname: profile._json.name,
                    lastname: " ",
                    age: 18, //default
                    email: profile._json.email,
                    password: createHash('password')
                });
                return done(null, userCreated);
            }else{
                done(null, false);
            };
        }catch(error){
            done(error);
        };
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id); // Ininitialization of the session
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user); // Delete user session
    });
};

export default initializaPassport;