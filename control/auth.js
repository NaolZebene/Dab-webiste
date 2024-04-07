const wrapAsync = require('../utils/wrapAsync')
const { knexInstance } = require('../db/knexInstance')
const ExpressError = require('../utils/ExpressError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('config')

const { promisify } = require('util')

module.exports.loginForm = function (req, res) {
    res.render('admin/Login');
}

module.exports.loginUser = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const admin = await knexInstance.from("admins").where({
        email
    }).first();

    if (!admin) return res.redirect("/admin/login");

    bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) return res.render("/admin/login")

        console.log(err, isMatch)

        if (isMatch) {
            const token = jwt.sign({ id: admin.adminId }, config.get('jwtPrivateKey'));

            res.cookie('token_admin', token, { httpOnly: true });

            res.redirect('/admin/allblogs');
        } else {
            return res.render("/admin/login")
        }
    })
})


module.exports.isLoggedIn = wrapAsync(async function (req, res, next) {
    if (req.cookies.token_admin) {
        const token = req.cookies.token_admin;
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        const adminId = decoded.id;
        const data = await knexInstance.from('admins').where({ adminId: adminId })
        if (!data) {
            req.flash('error', "Invalid User ID")
            return res.redirect('/admin/login')
        }
    } else {
        req.flash("success", "Login Required")
        return res.redirect("/admin/login")
    }
    next();
})

module.exports.logoutUser = wrapAsync(async function (req, res) {
    res.clearCookie("token_admin");
    res.redirect('/admin/login')
})