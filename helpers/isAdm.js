function isAdm(req, res, next){
    if(req.user){
        if(req.user[0].adm == 1){
            next()
        }else{
            req.flash('error_msg', 'You are not administrator!')
            res.redirect('/login')
        }
    }else{
        req.flash('error_msg', 'You are not administrator!')
        res.redirect('/login')
    }
}

module.exports = isAdm