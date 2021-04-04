function checkParams(name, password){

    let errors = []

    if(name.trim() === null || name.trim() === undefined || name.trim() === '' || name.length == 0){
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

function checkDocs(name, age, sex, nif, state){

    let errors = []

    if(name.trim() === null || name.trim() === undefined || name.trim() === '' || name.trim().length === 0){
        errors.push({text: 'Write the name!'})
    }

    if(age === null || age === undefined || age.length === 0){
        errors.push({text: 'Write the age!'})
    }

    if(sex.trim() === null || sex.trim() === undefined || sex.trim() === '' || sex.length === 0){
        errors.push({text: 'Write the sex!'})
    }

    if(state.trim() === null || state.trim() === undefined || state.trim() === '' || state.length === 0 ||
        state.trim().toUpperCase() !== 'POSITIVE' || state.trim().toUpperCase() !== 'NEGATIVE' || 
        state.trim().toUpperCase() !== 'RECOVERED' || state.trim().toUpperCase() !== 'INCONCLUSIVE' 
    ){
        errors.push({text: 'Write the sex!'})
    }

    if(nif === null || nif === undefined || nif.length === 0){
        errors.push({text: 'Write the age!'})
    }else if(nif.length > 9 || nif.length < 9){
        errors.push({text: 'The nif was incorrect!'})
    }

    return errors
}

module.exports = {
    checkParams: checkParams,
    checkDocs: checkDocs
}