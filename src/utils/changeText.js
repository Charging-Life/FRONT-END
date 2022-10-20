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

export {chanageCategoryText};