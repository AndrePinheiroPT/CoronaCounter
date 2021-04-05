const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

function checkADM(req, res, next){
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: "please give a token"})
    else{
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            req.user = value.data

            if (req.user.admim) next()
            else return res.status(200).json({error: 'You arent ADM!'})
        })
    }
}

function checkHOSPITAL(req, res, next){
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: "please give a token"})
    else{
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            req.user = value.data
            next()
        })
    }
}

module.exports = {
    checkADM,
    checkHOSPITAL
}