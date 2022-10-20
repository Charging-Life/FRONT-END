const isValidEmail = (email) => {
    return email.includes('@') && email.includes('.');
}

const isValidPassword = (password) => {
    return password.length >= 8;
}

const isValidCarNumber = (carNmber) => {
    const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    let korCnt = 0;
    carNmber.split('').map(x => {
        if(reg.test(x)) korCnt++;
    })
    return korCnt === 1 ? true : false;   
}

const checkSpecial = (str) => {
    const regExp =  /[~!@#$%^&*()_+|<>?:{}]/g;
    return regExp.test(str)
}

export {isValidEmail, isValidPassword, isValidCarNumber, checkSpecial};