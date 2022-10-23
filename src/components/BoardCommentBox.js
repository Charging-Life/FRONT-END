import axios from 'axios';
import React, {useState} from 'react';

import '../styles/components/BoardCommentBox.css';
import { calcCreateTime } from '../utils/changeData';

const BoardCommentBox = ({data, board_id}) => {
    
    const [showModal, setShowModal] = useState(false);

    // 댓글 수정
    const handleCommentModify = () => {
        if(window.confirm('해당 댓글을 수정하시겠습니까?')) {
            axios.patch(`${process.env.REACT_APP_PROXY}/board/${board_id}/comment/${data.id}`)
            .then(res => {
                alert('삭제되었습니다.');
                window.location.reload();
            })
        }
    }

    // 댓글 삭제
    const handleCommentDelete = () => {
        if(window.confirm('해당 댓글을 삭제하시겠습니까?')) {
            axios.delete(`${process.env.REACT_APP_PROXY}/board/${board_id}/comment/${data.id}`)
            .then(res => {
                alert('삭제되었습니다.');
                window.location.reload();
            })
            .catch(err => {
                alert('삭제하지 못했습니다.');
            })
        }
    }

    const CommentModal = () => {
        return <div className='comment_modal'>
            <span onClick={handleCommentModify}></span>&nbsp;
            <span onClick={handleCommentDelete}>삭제</span>
        </div>
    }

    return (
        // 댓글 박스 하나
        <div className='BoardCommentBox'>
            {/* 이름, 작성시간 */}
            <div id='comment_top_box'>
                <div><b>{data.memberName}</b> <span>{calcCreateTime(data.creationDateTime)}</span></div>
                {localStorage.getItem('CL_email') === data.memberEmail && <div><img onClick={() => setShowModal(!showModal)} src="/images/icons/CL_icon_more.png"/></div>}
            </div>
            {/* 내용 */}
            <div>{data.comment}</div>
            {/* 좋아요 이미지 */}
            {/* <div><img src='/images/icons/CL_icon_unfill_heart.png'/> {data.likes}</div> */}
            <div></div>
            {showModal && <CommentModal/>}
        </div>
    );
};

export default BoardCommentBox;