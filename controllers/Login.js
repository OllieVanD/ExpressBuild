require('dotenv').config()
const {Login} = require('../models');
const bcrypt = require('bcryptjs')

const loadLogin = async (req,res) => {
    res.render('LoginPage.ejs')    
}

const login = async (req, res) => {
    const user = await Login.findOne({ 
        where: {
            username: req.body.username
        }
    })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.currentUser = user
        res.redirect('/')
    }
    else {
        res.redirect('/Login')
    }
}

const loadRegister = async (req,res) => {
    res.render('register.ejs')    
}

const register = async (req,res) => {
    await Login.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        email:req.body.email,
    })
    res.redirect('/Login')

}


module.exports = {login, loadLogin, loadRegister, register}

