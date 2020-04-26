function checkAuthenticate(req, res, next){
    if(req.user){
        next()
    }else{
        req.flash('error_msg', 'You are not hospital user!')
        res.redirect('/login')
    }
}

module.exports = checkAuthenticate