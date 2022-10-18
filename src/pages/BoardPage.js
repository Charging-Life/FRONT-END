import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Bottombar from '../components/bars/Bar';
import '../styles/pages/BoardPage.css';

const BoardPage = () => {

    const category =['전체', '공지게시판', '자유게시판', '충전게시판'];
    const [boards, setBoards] = useState([]);

    // 임시 데이터
    const data = [
        {
            'id': 1,
            'title': '자유1',
            'description': '설명1', 
            'category': "FREE",
            'likes': 0,
            'comments': 0,
            'creationDateTime': '2022.10.22'
        }, 
        {
            'id': 2,
            'title': '공지1',
            'description': '설명2', 
            'category': "NOTICE",
            'likes': 0,
            'comments': 0,
            'creationDateTime': '2022.10.22'
        }, 
        {
            'id': 3,
            'title': '충전1',
            'description': '설명3', 
            'category': "STATION",
            'likes': 0,
            'comments': 1,
            'creationDateTime': '2022.10.22'
        }
    ];

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

    // 게시글 정렬을 위한 url 변경
    const handleSort = (e) => {
        
        let url = '';
        switch(e.target.id) {
            case 1:{ // 전체
                url = `${process.env.REACT_APP_PROXY}/board/list`;
                break;
            }
            case 2: { // 공지
                url = `${process.env.REACT_APP_PROXY}/board?category=NOTICE`;
                break;
            }
            case 3: { // 자유
                url = `${process.env.REACT_APP_PROXY}/board?category=FREE`;
                break;
            }
            case 4: { // 충전
                url = `${process.env.REACT_APP_PROXY}/board?category=STATION`;
                break;
            }
            default: {}
        }

        // axios로 필터링된 게시글 받아오기
        axios.get(url)
        .then(res => {
            console.log(res);
             // setBoards()
        })
        .catch(err => {
            console.log(err);
        })

    }

    // 게시글 하나 만드는 함수
    const makeBoardList = () => {
        
        const result = [];
        data.map((ele, idx) => {
            result.push(
                <div id='board_box'>
                    <div id='board_top_box'>
                        <div>{"닉네임"}</div>
                        <div>{chanageCategoryText(ele.category)}</div>
                    </div>
                    <div>{ele.description}</div>
                    {/* category가 자유이면 사진 추가, 충전이면 충전소 위치 추가 */}
                    <div>
                        <img src='/images/icons/CL_icon_heart.png' alt='likes'/>&nbsp;
                        {ele.likes}&nbsp;&nbsp;
                        <img src='/images/icons/CL_icon_comment.png' alt='comments'/>&nbsp;
                        {ele.comments}
                    </div>
                </div>
            )
        })

        return result;
    }

    // 게시물 read
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/board/list`)
        .then(res => {
            console.log(res.data);
            // setBoards()
        })
    }, []);

    return (
        <div id='BoardPage'>
            <div id='bookmarkHeader'>
                <Header page={"board"}/>
            </div>
            <div id='board_container'>
                <div id='board_category'>
                    {category.map((x, idx)=>
                        <div id={idx} onClick={handleSort}>{x}</div>)}
                </div>
                <div id='board_list'>
                    {makeBoardList()}
                </div>
            </div>
            <Bottombar value={3}/>
        </div>
    );
};

export default BoardPage;