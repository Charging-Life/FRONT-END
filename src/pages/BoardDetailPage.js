import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import Header from '../components/Header';
import Bar from '../components/bars/Bar';
import {chanageCategoryText} from '../utils/changeText';
import '../styles/pages/BoardDetailPage.css';

const BoardDetailPage = () => {

    const {id} = useParams();
    const [detailData, setDetailData] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentValue, setCommentValue] = useState();

    const makeComments = () => {

    }

    const makeDetailInfo = () => {

    }

    const getDetailInfo = () => {
        axios(`${process.env.REACT_APP_PROXY}/board/${id}`)
        .then(res => {
            setDetailData(res.data);
        })
        .catch(err => console.log(err));
    }

    const getComments = () => {
        axios(`${process.env.REACT_APP_PROXY}/board/${id}/comment`)
        .then(res => {
            setComments(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getDetailInfo();
        getComments();
        
    }, []);

    console.log(detailData);
    return (
        <div id='BoardDetailPage'>
            <div id='bookmarkHeader'>
                <Header page={"board"}/>
            </div>
            <div id='board_detail_container'>
                <div id='board_detail_box'>
                    <div id='board_top_box'>
                        <div>{"작성자"}</div>
                        <div>{chanageCategoryText(detailData.category)}</div>
                    </div>
                    <div id='board_middle_box'><span>{detailData.title}</span><br/><br/>{detailData.description}<br/><br/></div>
                    {/* category가 자유이면 사진 추가, 충전이면 충전소 위치 추가 */}
                    {makeDetailInfo()}
                    <div>
                        <img src='/images/icons/CL_icon_heart.png' alt='likes'/>&nbsp;
                        {detailData.likes}&nbsp;&nbsp;
                        <img src='/images/icons/CL_icon_comment.png' alt='comments'/>&nbsp;
                        {comments.length}
                    </div>
                </div>
                <div id='comment_input'>
                    <input type='text' value={commentValue}/>
                    <button>댓글 작성</button>
                </div>
                <div id='comment_list'>
                    {makeComments()}
                </div>
            </div>
            <Bar value={3}/>
        </div>
    );
};

export default BoardDetailPage;