import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/UpdateModal.css';
import { companyInfo } from '../../security/companyInfo';

const UpdateModal = ({userInfo, show, onHide}) => {

    // 기존 유저 정보
    const [ modifyUserInfo, setModifyUserInfo ] = useState({
        email: userInfo.email,
        company: userInfo.company
    });

    // 선택된 회사 저장 배열
    const [ clickedBtnArr, setClickedBtnArr ] = useState(userInfo.company);

    const onChangeEmail = (e) => {
       setModifyUserInfo((prev) => {
           return { ...prev, email: e.target.value}
       })
    }

    const onClickCompanyBtn = (e) => {
        if(!clickedBtnArr.includes(e.target.value)) {
            clickedBtnArr.push(e.target.value);
            e.target.className = 'btns-clicked';
        } else {
            clickedBtnArr.splice(clickedBtnArr.indexOf(e.target.value), 1);
            e.target.className = 'btns';
        }
    }   

    const onClickModify = () => {
        if( clickedBtnArr.length === 0 ) {
            alert("기업은 최소 1개 이상 선택해야 합니다.");
            return;
        } 
        // 수정하기 통신 추가
        onHide();
    }
    
    // 초성 찾는 함수
    const getFirst = (src) => {
        var c = ''; 
        var index = ((src - 44032) /28) / 21;
        if(index > 0) {
            c = String.fromCharCode(index + 4352);
        }
        return c;
    }

    // 기업별 가나다 순으로 정렬한 객체 생성 함수
    const makeObj = () => {
        let consonantObj = {};

        // 정렬
        companyInfo.sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        // 객체 저장 
        for(let i=0; i<companyInfo.length; i++) {
            const consonant = getFirst(companyInfo[i].name.charCodeAt(0));
            if(!Object.keys(consonantObj).includes(consonant)) {
                consonantObj[`${consonant}`] = [companyInfo[i].name];
            } else {
                consonantObj[`${consonant}`].push(companyInfo[i].name);
            }
        }
        return consonantObj;
    }

    // 화면에 보이는 버튼 생성 함수
    const makeCompanyBtns = () => {
        let consonantObj = makeObj();
        let btnArr = [];

        Object.keys(consonantObj).map((key, idx) => {
            btnArr.push(
                <>
                    <div id='consonant'>{key}</div>
                    <div className='btn-box'>{
                        consonantObj[key].map((ele) => {
                            if(clickedBtnArr.includes(ele)) {
                                return <button className='btns-clicked' onClick={onClickCompanyBtn} value={ele}>{ele}</button>
                            } else {
                                return <button className='btns' onClick={onClickCompanyBtn} value={ele}>{ele}</button>
                            }
                            
                        })
                    }</div>
                </>
            )
        })

        return btnArr;
    }

    return (
        <div className='UpdateModal'>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header>
                    <div></div>
                    <span>회원정보 수정</span>
                    <div id='close-icon' onClick={onHide}><img src='/images/CL_icon_close.png'/></div>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-member-info'>
                        <div className='my-title-text'>이메일</div>
                        <input id='email-input'value={modifyUserInfo.email} onChange={onChangeEmail}/>
                        <div className='my-title-text'>기업명</div>
                        <div className='company-btns'>
                            {
                                makeCompanyBtns()
                            }
                        </div>
                    </div>
                </Modal.Body>
                <div id="modify-btn"><button onClick={onClickModify}>수정하기</button></div>
                <br/>
            </Modal>
        </div>
    );
};

export default UpdateModal;
