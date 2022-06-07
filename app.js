const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');




app.use(express.json());

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}))


app.use('/private', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    else {
        next();
    }
});

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.render('views/layouts/login');
    }
    else {
        req.method = 'POST';
        next();
    }

})
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});