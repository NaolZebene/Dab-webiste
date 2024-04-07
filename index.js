const express = require('express');
const methodOverride = require("method-override");
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');


require('./db')();



//routes
const ClientRouter = require('./router/client')
const AdminRouter = require('./router/admin')
const AuthRoutes = require('./router/auth')

const app = express();
const PORT = 3000

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));



const sessionConfig = {
    secret: "thisisthesecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
}



app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/images')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser("cookieParserSecret"));
app.use(flash());
app.use(session(sessionConfig))

app.use(function (req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use('', ClientRouter)
app.use('/admin', AdminRouter)
app.use('/admin', AuthRoutes)


app.use("*", function (req, res, next) {
    next(new ExpressError("Page Not Found", 404));
});



app.use(function (err, req, res, next) {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Someting Went Wrong";
    }
    res.status(statusCode).render("error", { err });
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
})