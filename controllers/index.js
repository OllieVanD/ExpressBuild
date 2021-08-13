require('dotenv').config()
const {Login, Message} = require("../models")
const {Op} = require('sequelize')

const loadPage = async (req,res) => {
    if (req.session.currentUser) {
        res.locals.currentUser = req.session.currentUser
        res.locals.Users = await Login.findAll({})


        res.locals.Messages = await Message.findAll({
            where: {
                [Op.or] : [{
                
                    LoginId: req.session.currentUser.id
                }
                ,
                {
                 senderId : req.session.currentUser.id
                },
            ]
            }, 
            include : {all:true},
            order: [['id','desc']]
        })


        res.render('homePage.ejs')
    }
    else { 
        res.redirect('/Login')
    }
}


module.exports = {loadPage}