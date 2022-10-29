import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Bar from '../components/bars/Bar';
import '../styles/pages/BoardPage.css';
import { useNavigate } from 'react-router';
import {chanageCategoryText} from '../utils/changeData';
import {calcCreateTime} from '../utils/changeData';

const BoardPage = () => {

    const navigate = useNavigate();
    const category =['전체', '공지게시판', '자유게시판', '충전게시판'];
    const [boards, setBoards] = useState([]);
    const [activeSort, setActiveSort] = useState(0);

    // 게시글 정렬을 위한 url 변경
    const handleSort = (idx) => {

        let url = '';
        switch(idx) {
            case 0:{ // 전체
                url = `${process.env.REACT_APP_PROXY}/board/list`;
                setActiveSort(0);
                break;
            }
            case 1: { // 공지
                url = `${process.env.REACT_APP_PROXY}/board?category=NOTICE`;
                setActiveSort(1);
                break;
            }
            case 2: { // 자유
                url = `${process.env.REACT_APP_PROXY}/board?category=FREE`;
                setActiveSort(2);
                break;
            }
            case 3: { // 충전
                url = `${process.env.REACT_APP_PROXY}/board?category=STATION`;
                setActiveSort(3);
                break;
            }
            default:{}
        }
        
        // axios로 필터링된 게시글 받아오기
        axios.get(url)
        .then(res => {
             setBoards(res.data);
        })
        .catch(err => {
            console.log(err);
        })

    }

    // 글쓰기
    const handleWrite = () => {
        if(!localStorage.getItem('CL_accessToken')) {
            alert('로그인 후 이용해주세요.');
            navigate('/login');
            return;
        }
        navigate('/board/write');
    }

    // 게시글 하나 만드는 함수
    const makeBoardList = () => {
        const result = [];
        boards.map((ele, idx) => {
                result.push(
                    <div id='board_box' key={idx} onClick={()=>navigate(`/board/${ele.id}`)}>
                        <div id='board_top_box'>
                            <div>{ele.title}</div>
                            <div>{chanageCategoryText(ele.category)}</div>
                        </div>
                        <div>{ele.description}</div>
                        {ele.chargingStation.statNm && 
                        <div id='station_box'>
                            <img src='/images/icons/CL_icon_station.png' alt='station'/>
                            <div>{ele.chargingStation.statNm}</div>
                        </div>}
                        <div id='board_bottom_box'>
                            {calcCreateTime(ele.creationDateTime)}&nbsp;|&nbsp;
                            {ele.member.name}&nbsp;|&nbsp;
                            <img src='/images/icons/CL_icon_heart.png' alt='likes'/>&nbsp;
                            {ele.likes}&nbsp;&nbsp;
                            <img src='/images/icons/CL_icon_comment.png' alt='comments'/>&nbsp;
                            {ele.cntComments}&nbsp;&nbsp;
                            <img src='/images/icons/CL_icon_visit.png' alt='visits'/>&nbsp;
                            {ele.visit}
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
            setBoards(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div id='BoardPage'>
            <div id='bookmarkHeader'>
                <Header page={"board"}/>
            </div>
            <div id='board_container'>
                <div id='board_category'>
                    {category.map((x, idx)=>
                        <div id={activeSort === idx ? 'selected_sort_item' : 'sort_item'} key={idx} onClick={() =>handleSort(idx)}>{x}</div>)}
                </div>
                <div className='board_list'>
                    { boards.length === 0 ? <div id='no_content'>현재 등록된 <br/>게시글이 없습니다</div> :  makeBoardList()}
                </div>
            </div>
            <div id='addBtn' onClick={handleWrite}><img src='/images/icons/CL_icon_write.png'/></div>
            <Bar value={3}/>
        </div>
    );
};

export default BoardPage;