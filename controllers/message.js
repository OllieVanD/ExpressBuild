require('dotenv').config()
const {Message,Login} = require("../models")
const {Op} =require('sequelize')
const mandrill = require('node-mandrill')(process.env.API_KEY);

const loadMessage = async (req,res) => {
        const messages = await Message.findAll({
            where: {[Op.or] : [{
                LoginId: req.params.messengerId,
                senderId: req.params.receiverId
            },
            {LoginId: req.params.receiverId,
                senderId: req.params.messengerId
            }
         ],
   }, include :{all:true},
   order: [['id','desc']]
})

        res.render('messagePage.ejs',{
            jointMessages : messages,
            messengerId: req.params.messengerId,
            receiverId: req.params.receiverId,
            // layout: './layouts/homePage'
        })
}

const sendMessage = async (req,res) => {
     await Message.create({
        LoginId : req.params.messengerId,
        senderId: req.params.receiverId,
        Text : req.body.message
     });
    //  const user = await Login.findOne ({ 
    //      where: { 
    //          id : newMessage.LoginId
    //      }
    //  })
     

    //  sendMandrill(Message.Login.email,)
    // sendMandrill(user.email,user.username)

    res.redirect(`/sendMessage/${req.params.messengerId}/${req.params.receiverId}`)
}

    function sendMandrill (email,name) {
    mandrill('/messages/send', {
    message: {
        to: [{email: email, name: name}],
        from_email: 'ollievdr@hotmail.com',
        subject: "You've got a new message!",
        text: "Hello, I sent this message using mandrill."
    }
}, function(error, response)
{
    //uh oh, there was an error
    if (error) console.log( JSON.stringify(error) );

    //everything's good, lets see what mandrill said
    else console.log(response);
});
}

module.exports ={loadMessage,sendMessage}