const checkExpireToken = (status) => {
    let flag = true;
    if(status === 401) {
        flag = false;
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('CL_accessToken');
        localStorage.removeItem('CL_refreshToken');
        localStorage.removeItem('CL_auth');
        localStorage.removeItem('CL_email');
    }
    return flag;
}

export {checkExpireToken};