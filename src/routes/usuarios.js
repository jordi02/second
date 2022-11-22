import express from 'express';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import isLoggedIn from '../../middlewares/log.js';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../controller/usuariosController.js';
const router = Router();
const app = express();
app.use(express.json());

passport.use(
    "signup",
    new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
        Users.findOne({ username }, (err, user) => {
            if (user) return done(null, false);
            Users.create(
                { username, password: PassHashed(password) },
                (err, user) => {
                    if (err) return done(err);
                    return done(null, user);
                }
            );
        });
    })
);

passport.use(
    "login",
    new LocalStrategy({}, (username, password, done) => {
        Users.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!validatePass(password, user.password)) return done(null, false);
            return done(null, user);
        });
    })
);


const PassHashed = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
}

const validatePass = (pass, hashedPass) => {
    return bcrypt.compareSync(pass, hashedPass);
};

passport.serializeUser((userObj, done) => {
    done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, done);
});


app.use(passport.initialize());
app.use(passport.session());



router.get('/login', isLoggedIn, (req, res) => {
    res.render('login', {
        layout: 'login',
        title: 'Login',
    })
})



router.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
    (req, res) => {
        const { username } = req.body;
        req.session.user = username;
        res.redirect("/");
    }
);

router.get("/faillogin", (req, res) => {
    res.send("Usuario o contraseña incorrectos <a href='/login'>Volver</a>");
});



router.get('/signup', (req, res) => {
    res.render('register', {
        layout: 'register',
        title: 'Register',
    })
})

router.post('/signup', passport.authenticate('signup', { failureRedirect: "/failregister" }), (req, res) => {
    console.log("registrado")
    res.redirect('/');
});

router.get("/failregister", (req, res) => {
    res.send("El usuario ya existe <a href='/signup'>Volver</a>");
});

router.get('/logout', (req, res) => {
    const username = req.session.user
    req.session.destroy();
    res.render('logout', {
        layout: 'logout',
        title: 'logout',
        name: username,
    })
}
)

export { router as usersRouter }