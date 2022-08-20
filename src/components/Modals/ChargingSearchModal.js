import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/ChargingSearchModal.css';

const ChargingSearchModal = ({show, onHide}) => {
    const [searchValue, setSearchValue] = useState('');
    const [chargingList, setChargingList] = useState('');
    const [selectCharging, setSelectCharging] = useState([]);

    const inputRef = useRef();

    const changeInput = (e) =>{
        setSearchValue(e.target.value);
    }

    const clickCharging = (id) =>{
        if(selectCharging.includes(id)){
            for(let i = 0; i < selectCharging.length; i++){
                if(selectCharging[i] === id){
                    setSelectCharging(selectCharging.splice(i, 1));
                    i--;
                }
            }
        }
        else{
            setSelectCharging([...selectCharging, id]);
        }
    }

    const showChargingList = () => {
        const showList = [];

        if(chargingList !== []){
            for(let i = 0; i < chargingList.length; i++){
                showList.push(
                    <div onClick={()=>{clickCharging(chargingList[i]['statId'])}} className={selectCharging.includes(chargingList[i]['statId'])?'search_clicked':'search_click'}>
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
            showList.push(<div>검색된 충전소가 없습니다.</div>)
        }

        return(showList);
    }

    useEffect(()=>{
        if(searchValue !== ''){
            axios.get(`${process.env.REACT_APP_PROXY}/station?statNm=${searchValue}`)
            .then((res)=>{
                setChargingList(res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [searchValue])

    const saveSelected = ()=>{
        if(selectCharging === []){
            inputRef.current.focus();
            return;
        }
        axios.post(`${process.env.REACT_APP_PROXY}/member/station`,{
            statId: selectCharging
        },{
            headers: {Authorization: localStorage.getItem('CL_accessToken')}
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='ChargingSearchModal'>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header>
                    <div className='search_header'>
                        <input ref={inputRef} placeholder='구미 시청' value={searchValue} onChange={changeInput}/>
                        <img/>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='search_body'>
                        {searchValue==='' && chargingList === ''
                        ?<div>충전소를 검색해보세요.</div>
                        :showChargingList()}
                    </div>
                    <div className='search_footer'>
                        <div onClick={onHide()}>닫기</div><div onClick={()=>{saveSelected()}}>등록</div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChargingSearchModal;

