function checkParams(name, password){

    let errors = []

    if(name == null || name == undefined || name.length == 0){
        errors.push({text: 'You didnt fill in the name of hospital!'})
    }
    
    if(password == null || password == undefined || password.length == 0){
        errors.push({text: 'You didnt fill in the password!'})
    }

    if(password.length < 10){
        errors.push({text: 'The password is very small!'})
    }

    return errors
}

module.exports = {
    checkParams: checkParams
}