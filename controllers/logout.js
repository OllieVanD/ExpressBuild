const logout = (req,res) => {
    req.session.currentUser = undefined
    res.locals.currentUser = undefined
    res.locals.Users = undefined

    res.redirect('/Login')
}

module.exports = {logout}