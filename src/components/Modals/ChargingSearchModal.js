import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/ChargingSearchModal.css';

const ChargingSearchModal = ({show, onHide, manageStation, setManageStation}) => {
    const [searchValue, setSearchValue] = useState('');
    const [chargingList, setChargingList] = useState('');
    const [selectCharging, setSelectCharging] = useState([]);

    const inputRef = useRef();

    const changeInput = (e) =>{
        setSearchValue(e.target.value);
    }

    useEffect(()=>{
        setSearchValue('');
        setChargingList('');
        setSelectCharging([]);
    },[onHide])

    const clickCharging = (charging) =>{
        let add = -1;
        selectCharging.map((charge, i) => {
            if(charge['statId'] === charging['statId']) add=i;
        })

        if(add === -1){
            setSelectCharging([...selectCharging, charging])
        }
        else{
            const temp = [];
            selectCharging.map((charge) => {
                if(charge['statId'] !== charging['statId']) temp.push(charge);
            })
            setSelectCharging(temp);
        }
    }
    const checkClassName = (id) =>{
        let className = 'search_click'
        selectCharging.map(charge => {
            if(charge['statId'] === id){
                className = 'search_clicked';
                return;
            } 
        })
        return className;
    }

    const showChargingList = () => {
        const showList = [];

        if(chargingList.length > 0){
            for(let i = 0; i < chargingList.length; i++){
                showList.push(
                    <div key={i} onClick={()=>{clickCharging(chargingList[i])}} className={checkClassName(chargingList[i]['statId'])}>
                        <div>
                            {chargingList[i]['statNm']}
                        </div>
                        <div>
                            {chargingList[i]['address']}
                        </div>
                    </div>
                );
            }
        }
        else{
            showList.push(<div key={-1} className='search_empty2'>검색 결과가 없습니다.</div>);
        }


        return(showList);
    }

    useEffect(()=>{
        if(searchValue !== ''){
            axios.get(`${process.env.REACT_APP_PROXY}/station?statNm=${searchValue}`)
            .then((res)=>{
                setChargingList(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            setChargingList([]);
        }
    }, [searchValue])

    const saveSelected = ()=>{
        if(window.confirm('추가 등록 하시겠습니까?')){
            if(selectCharging.length > 0){
                const sendList = selectCharging.map(charge=>{
                    return charge['statId'];
                })
    
                axios.post(`${process.env.REACT_APP_PROXY}/member/station`,{
                    statId: sendList
                },{
                    headers: {Authorization: localStorage.getItem('CL_accessToken')}
                })
                .then((res)=>{
                    setManageStation([...manageStation, ...selectCharging]);
                    console.log(res);
                    onHide();
                    alert('등록되었습니다.');
                })
                .catch((err)=>{
                    console.log(err);
                })
    
                return;
            }
            inputRef.current.focus();
        }
    }

    const delCharging = (id) =>{
        const temp = [];
        selectCharging.map((charge) => {
            if(charge['statId'] !== id) temp.push(charge);
        })
        setSelectCharging(temp);
    }
    const showSelectHorizen = () =>{
        const showList = [];

        if(selectCharging !== []){
            for(let i = selectCharging.length-1; i >= 0 ; i--){
                showList.push(
                    <div key={i}>
                        <div>{selectCharging[i]['statNm']}</div>
                        <button onClick={()=>{delCharging(selectCharging[i]['statId'])}}><img alt='취소' src='images/icons/CL_icon_close.png'/></button>
                    </div>
                );
            }
        }

        return showList;
    }

    return (
        <div className='ChargingSearchModal'>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header className='search_header'>
                    <input ref={inputRef} autoFocus placeholder='검색' value={searchValue} onChange={changeInput}/>
                    <img alt='검색' src='images/icons/CL_icon_search.png'/>
                </Modal.Header>
                {selectCharging.length>0&&
                <div className='search_select_horizenList_parent'>
                    <div className='search_select_horizenList'> 
                        {showSelectHorizen()}
                    </div>
                </div>}
                <Modal.Body>
                    <div className='search_body'>
                        {searchValue==='' && chargingList === ''?<div className='search_empty'>충전소를 검색해보세요.</div>:showChargingList()}
                    </div>
                    <div className='search_footer'>
                        <div onClick={onHide}>닫기</div><div onClick={()=>{saveSelected()}}>등록</div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChargingSearchModal;

