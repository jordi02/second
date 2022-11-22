import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import daoMongo from '../src/daos/usuarios/daoMongo.js';
const daoUsuarios = new daoMongo();

const app = express();
app.use(express.json());


const PassHashed = (password) => {
    bcrypt.hash(pass, 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            return hash;
        }
    });
}

const validatePass = (password, PassHashed) => {
    return bcrypt.compareSync(password, PassHashed);
};

const authMw = (req, res, next) => {
    req.isAuthenticated() ? next() : res.send({ error: false });
};



passport.use(
    "signup",
    new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
        await daoUsuarios
            .findUserByName(username)
            .then((user) => {
                console.log(user)
                if (user.length > 0) {
                    console.log("Usuario ya registrado");
                    return done(null, false, { message: "Usuario ya existe" });
                } else {
                    const newUser = daoUsuarios.create({ username, password });
                    return done(null, newUser);
                }
            })
            .catch((err) => {
                return done(err);
            });
    })
);

passport.use(
    "login",
    new LocalStrategy({}, async (username, password, done) => {
        await daoUsuarios.findUserByName({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!validatePass(password, user.password)) return done(null, false);
            return done(null, user);
        });
    })
);

passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    daoUsuarios.readById(id, done);
});

app.use(passport.authorize());

app.use(
    session({
        secret: "sg%j32o5jlmer",
        cookie: {
            maxAge: 60000,
        },
        saveUninitialized: false,
        resave: true,
    })
);

app.use(passport.session());




app.post('/login', passport.authenticate('login', { failureMessage: "ERROR AL LOGUEAR" }), (req, res) => {
    res.redirect('/');
});

app.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.send("Registrado!!")
});


app.listen(8080, () => {
    console.log('Server ON Testeando passport');
});