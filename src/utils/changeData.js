// 카테고리에 따른 텍스트 변경
const chanageCategoryText = (category) => {

    let result = '';
    switch(category) {
        case 'FREE': {
            result = '자유게시판';
            break;
        }
        case 'STATION' : {
            result = '충전게시판';
            break;
        }
        case 'NOTICE' : {
            result = '공지게시판';
            break;
        }
        default : {}
    }

    return result;
}

// 시간 계산
const calcCreateTime = (createTime) => {

    let [date, time] = createTime.split(' ');
    date = date.split('.').map(x=>+x);
    time = time.split(':').map(x=>+x);

    const todayDate = new Date();
    let result = '';

    if(todayDate.getFullYear() > date[0]) {
        result = `${todayDate.getFullYear() - date[0]}년 전`;
    }
    else if(todayDate.getMonth()+1 > date[1]) {
        result = `${todayDate.getMonth()+1 - date[1]}개월 전`;
    }
    else if(todayDate.getDate() > date[2]) {
        result = `${todayDate.getDate() - date[2]}일 전`;
    }
    else if(todayDate.getHours() > time[0]) {
        result = `${todayDate.getHours() - time[0]}시간 전`;
    }
    else if(todayDate.getMinutes() > time[1]) {
        result = `${todayDate.getMinutes() - time[1]}분 전`;
    }
    else {
        result = '방금 전';
    }

    return result;
}

export {chanageCategoryText, calcCreateTime};