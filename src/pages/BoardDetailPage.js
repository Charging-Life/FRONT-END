import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

import Header from '../components/Header';
import Bar from '../components/bars/Bar';
import {chanageCategoryText} from '../utils/changeData';
import '../styles/pages/BoardDetailPage.css';
import BoardCommentBox from '../components/BoardCommentBox';
import { calcCreateTime } from '../utils/changeData';
import { checkExpireToken } from '../utils/checkExpireToken';

const BoardDetailPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [detailData, setDetailData] = useState();
    const [comments, setComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [likeCnt, setLikeCnt] = useState();

    console.log(detailData);

    // ------------------------ 댓글 ------------------------------

    // 댓글박스 만들기
    const makeComments = () => {

        const result = [];
        comments.map((x, idx) => {
            result.push(<BoardCommentBox key={idx} data={x} board_id={id}/>);
        })

        return result;
    }

    // category가 자유이면 사진 추가, 충전이면 충전소 위치 추가
    const makeDetailInfo = () => {
        if(detailData.category === 'FREE') {
            return <div id='file_box'>{detailData.fileId && makeFile(detailData.fileId)}</div>
        }
        else if(detailData.category === 'STATION') {
            return <div id='file_box'>{detailData.fileId && makeFile(detailData.fileId)}</div>
        }
    }

    // 댓글 데이터 저장
    const handleComment = (e) => {
        setCommentValue(e.target.value);
    }

    // 댓글 작성
    const handlePostComment = (e) => {

        if(!commentValue) {
            alert('댓글이 입력되지 않았습니다.');
            return;
        }

        if(window.confirm('댓글을 작성하시겠습니까?')) {
            
            // 폼데이터 생성
            const formData = new FormData();
            // 데이터 안에 넣을 객체 생성
            const obj = { 'comment': commentValue };
            // blob 객체로 데이터 정의 (대규모 바이너리 파일 저장 컨테이너)
            const data = new Blob([JSON.stringify(obj)], {
                type: 'application/json'
            });
            // form data에 추가
            formData.append('commentReqDto', data );

            // 댓글 통신
            axios.post(`${process.env.REACT_APP_PROXY}/board/${id}/comment`, formData
            , {
                headers: {
                    'Authorization': localStorage.getItem('CL_accessToken'),
                    'Content-type': 'application/json'
                }
            })
            .then(res => {
                alert('작성되었습니다.');
                setCommentValue('');
                window.location.reload();
            })
            .catch(err =>{
                if(checkExpireToken(err.response.status)) {
                    navigate('/login');
                }
                else alert('작성에 실패하였습니다.');
            });
        }
    }

    // 댓글 조회
    const getComments = () => {
        axios.get(`${process.env.REACT_APP_PROXY}/board/${id}/comment`)
        .then(res => {
            setComments(res.data.reverse());
        })
        .catch(err => console.log(err));
    }

    // ------------------------ 게시글 ------------------------------

    // 게시글 상세정보 조회
    const getDetailInfo = () => {
        axios.get(`${process.env.REACT_APP_PROXY}/board/${id}`)
        .then(res => {
            setDetailData(res.data);
            setLikeCnt(res.data.likes);
        })
        .catch(err => console.log(err));
    }

    // 게시글 수정
    const handleModify = () => {
        
    }

    // 게시글 삭제
    const handleDelete = () => {
        if(window.confirm('해당 게시물을 삭제하시겠습니까? ')) {
            axios.delete(`${process.env.REACT_APP_PROXY}/board/${id}`)
            .then(res => {
                alert('삭제되었습니다.');
                navigate('/board');
            })
            .catch(err => {
                alert('삭제하지 못했습니다.');
            })
        }
    }

    // 게시글 좋아요 여부
    const getIsLiked = () => {

        if(localStorage.getItem('CL_accessToken')) {
            axios.get(`${process.env.REACT_APP_PROXY}/board/${id}/check`, {
                headers: {
                    'Authorization': localStorage.getItem('CL_accessToken')
                }
            }) 
            .then(res => {
                if(res.data === 'PRESENT') {
                    setIsLiked(true);
                }
            })
            .catch(err => {
                if(checkExpireToken(err.response.status)) {
                    navigate('/login');
                }
                else alert('데이터를 불러오지 못했습니다.');
            })
        }
    }

    // 게시글 좋아요 등록 / 취소 
    const handleLikes = () => {

        if(!localStorage.getItem('CL_accessToken')) {
            alert('로그인 후 이용해주세요.');
            navigate('/login');
            return;
        }

        let flag = isLiked ? 'UNLIKE' : 'LIKE';

        if(window.confirm(`좋아요를 ${isLiked ? '취소' : '등록'}하시겠습니까?`)) {
            axios.post(`${process.env.REACT_APP_PROXY}/board/${id}/like?like=${flag}`, {}, {
                headers: {
                    'Authorization': localStorage.getItem('CL_accessToken')
                }
            })
            .then(res => {
                setIsLiked(!isLiked);
                if(isLiked) {
                    alert('취소되었습니다.');
                    setLikeCnt(likeCnt-1);
                }
                else {
                    alert('등록되었습니다.');
                    setLikeCnt(likeCnt+1);
                }
            })
            .catch(err => {
                if(checkExpireToken(err.response.status)) {
                    navigate('/login');
                }
                else alert('실패하였습니다.');
            });
        }
    }

    // 파일 가져오기
    const makeFile = (fileArr) => {

        const result = [];
        for(let i = 0; i<2; i++) {
            if(!fileArr[i]) continue;
            result.push(<img src={`${process.env.REACT_APP_PROXY}/file/${fileArr[i]}`}/>);
        }

        return result;
    }

    useEffect(() => {
        getDetailInfo();
        getIsLiked();
        getComments();
    }, []);

    return (
        <div id='BoardDetailPage'>
            <div id='bookmarkHeader'>
                <Header page={"board"}/>
            </div>
            <div id='board_detail_container'>
                {
                    detailData && 
                    <>
                        <div id='board_detail_box'>
                            {/* 이름, 카테고리 */}
                            <div id='board_detail_top_box'>
                                <div><b>{detailData.member.name}</b> <span>{calcCreateTime(detailData.creationDateTime)}</span></div>
                                <div id='board_detail_modify_delete'>
                                    <div>{chanageCategoryText(detailData.category)}</div>
                                    {localStorage.getItem('CL_email') === detailData.member.email && <div><span onClick={handleModify}> </span><span onClick={handleDelete}>삭제</span></div>}
                                </div>
                            </div>
                            {/* 제목, 설명 */}
                            <div id='board_middle_box'>
                                <span>{detailData.title}</span><br/><br/>{detailData.description}<br/><br/>
                                {/* category가 자유이면 사진 추가, 충전이면 충전소 위치 추가 */}
                                {makeDetailInfo()}
                            </div>
                            {/* 좋아요, 댓글 */}
                            <div id='like_comment_box'>
                                <span id='detail_like'>
                                    <img src={`/images/icons/CL_icon_${!isLiked ? 'unfill_' : ''}heart.png`} onClick={handleLikes} alt='likes'/>&nbsp;
                                    {likeCnt}
                                </span>&nbsp;&nbsp;
                                <img src='/images/icons/CL_icon_comment.png' alt='comments'/>&nbsp;
                                {comments.length}&nbsp;&nbsp;
                                <img src='/images/icons/CL_icon_visit.png' alt='visits'/>&nbsp;
                                {detailData.visit}
                            </div>
                        </div>
                    </>
                }
                <div id='comment_cnt'>&nbsp;{comments.length}개의 댓글</div>
                {/* 댓글 입력창 */}
                {
                    localStorage.getItem('CL_accessToken') && 
                    <div id='comment_input'>
                        <input placeholder='  댓글을 작성해주세요.' type='text' value={commentValue} onChange={handleComment}/>
                        <button onClick={handlePostComment}>댓글 쓰기</button>
                    </div>
                }
                {/* 댓글 리스트 */}
                <div id='comment_list'>
                    {comments.length === 0 ? <div id='no_comment'>현재 작성된<br/>댓글이 없습니다.</div> : makeComments()}
                </div>
            </div>
            <Bar value={3}/>
        </div>
    );
};

export default BoardDetailPage;