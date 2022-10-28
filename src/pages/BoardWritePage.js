import React, {useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

import '../styles/pages/BoardWritePage.css';
import '../components/UploadFile.js';
import UploadFile from '../components/UploadFile.js';
import { checkExpireToken } from '../utils/checkExpireToken';

const BoardWritePage = () => {

    const [file, setFile] = useState([]);
    const navigate = useNavigate();
    const {state} = useLocation();
    const category = state ? 'STATION' : 'FREE';
 
    const [writeData, setWriteData] = useState({
        title: '',
        description: '',
        category: category
    });

    const handleChangeData = (e) => {
        setWriteData({
            ...writeData,
            [e.target.name]: e.target.value
        })
    }

    // 게시글 등록
    const handlePost = () => {

        if(!writeData.category) {
            alert('카테고리를 선택해주세요.');
            return;
        }
        
        if(!writeData.title) {
            alert('제목을 입력해주세요.');
            return;
        }

        if(!writeData.description) {
            alert('내용을 입력해주세요.');
            return;
        }

        if(state) {
            writeData.statId = state;
        }

        if(window.confirm('게시글을 작성하시겠습니까?')) {
            const formData = new FormData();
            const data = new Blob([JSON.stringify(writeData)], {
                type: 'application/json'
            });

            formData.append('boardReqDto', data);
            
            for(let i = 0; i < file.length; i++) {
                const f = new Blob([file[i]], {
                    type: file[i].type
                });
                formData.append('file', f);
            }
            
            axios.post(`${process.env.REACT_APP_PROXY}/board`, formData
            , {
                headers: {
                    'Authorization': localStorage.getItem('CL_accessToken')
                }
            })
            .then(res => {
                alert('작성되었습니다.');
                navigate('/board');
            })
            .catch(err => {
                if(!checkExpireToken(err.response.status)) {
                    navigate('/login');
                }
                else alert('작성에 실패하였습니다.');
            });
        }

    }


    return (
        <div id='BoardWritePage'>
            <div id='write_page_header'>
                <div></div>
                <div>{state ? '충전소 게시글 작성' : '게시글 작성'}</div>
                <div onClick={handlePost}>완료</div>
            </div>
            <div id='write_form'>
                {/* <select defaultValue=''  name='category' onChange={handleChangeData}>
                    <option disabled value=''>게시판 선택</option>
                    {options.map((x, i) => <option key={i} value={x[1]}>{x[0]}</option>)}
                </select> */}
                <input type='text' value={writeData.title} name='title' onChange={handleChangeData} placeholder='제목을 입력하세요.' />
                <textarea id={file.length === 0 ? 'image_none_textArea' : 'image_exist_textArea'} value={writeData.description}  name='description' onChange={handleChangeData} placeholder='내용을 작성하세요.'></textarea>
                <div>
                    <UploadFile setFile={setFile}/>
                </div>
            </div>
        </div>
    );
};

export default BoardWritePage;