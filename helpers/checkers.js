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

function checkDocs(name, age, sex, nif){

    let errors = []

    if(name == null || name == undefined || name.length == 0){
        errors.push({text: 'Write the name!'})
    }

    if(age == null || age == undefined || age.length == 0 || typeof age === 'number'){
        errors.push({text: 'Write the age!'})
    }

    if(sex == null || sex == undefined || sex.length == 0){
        errors.push({text: 'Write the sex!'})
    }else if(sex != 'male' || sex != 'female'){
        errors.push({text: 'The sex was incorrect! '})
    }

    if(nif == null || nif == undefined || nif.length == 0 || typeof age === 'number'){
        errors.push({text: 'Write the age!'})
    }else if(nif.length > 9 || nif.length < 9){
        errors.push({text: 'The nif was incorrect!'})
    }
}

module.exports = {
    checkParams: checkParams,
    checkDocs: checkDocs
}