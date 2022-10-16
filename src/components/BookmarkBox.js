import React from 'react';
import axios from 'axios';

const BookmarkBox = ({data, idx, manageStation, setManageStation}) => {

    const handleCancelBookMark = (e) => {
        
        if(window.confirm('삭제하시겠습니까 ?')) {
            axios.delete(`${process.env.REACT_APP_PROXY}/member/${e.target.id}`,{
                headers: {
                    Authorization: localStorage.getItem('CL_accessToken')
                }
            })
            .then(res => {
                alert('삭제되었습니다.');
                let result = manageStation.filter(value => {
                    return String(value.id) !== e.target.id;
                });
                setManageStation(result);
                
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div id='stationBox' key={idx}>
            <div>
                {data.statNm} <br/> 
                <span>{data.address}</span> <br/>
                <span>현재 충전 가능합니다.</span>
            </div>
            <div><img id={data.id} onClick={handleCancelBookMark} src='/images/icons/CL_icon_selected_star.png'/></div>
        </div>
    );
};

export default BookmarkBox;