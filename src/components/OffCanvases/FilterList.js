import React from 'react';
import '../../styles/components/OffCanvases/FilterList.css';

const FilterList = ({filterStation, setFilterStation, buttonGroup, sendFilterResult}) => {

    const click_filterbutton = (index, category) => {
        if(index === 0){
            setFilterStation({...filterStation, [category]: [0]})
        }
        else{
            const temp_ary = filterStation[`${category}`];

            if(temp_ary.includes(0)){
                temp_ary.shift();
                temp_ary.push(index);
            }
            else{
                temp_ary.push(index);
            }

            temp_ary.length === buttonGroup[`${category}`].length - 1
            ?
            setFilterStation({...filterStation, [category]: [0]})
            :
            setFilterStation({...filterStation, [category]: temp_ary})
        }
    }

    const cancel_filterbutton = (index, category) => {
        if(filterStation[`${category}`].length === 1){
            setFilterStation({...filterStation, [category]: [0]});
        }
        else{
            const temp_ary = filterStation[`${category}`];

            const filterAry = temp_ary.filter((data)=>{
                return data !== index;
            })

            setFilterStation({...filterStation, [category]: filterAry})
        }
    }

    const showButton = (category) =>{
        const buttons = [];
        const button_values = buttonGroup[`${category}`];

        for(let i = 0; i < button_values.length; i++){
            buttons.push(
                filterStation[`${category}`].includes(i)
                ?
                <button key={i} className='filter_clicked_button' onClick={()=>{cancel_filterbutton(i, category)}}>
                    {button_values[i]}
                </button>
                :
                <button key={i} className='filterlist_button' onClick={()=>{click_filterbutton(i, category)}}>
                    {button_values[i]}
                </button>
            );
        }

        return buttons;
    }

    return (
        <div className='FilterList'>
            <div className='filterlist_box'>
                <div className='filterlist_title'>
                    사용 제한
                </div>
                <div className='filterlist_button_group'>
                    {showButton('limit')}
                </div>
            </div>
            <div className='filterlist_box'>
                <div className='filterlist_title'>
                    충전기 타입
                </div>
                <div className='filterlist_button_group_large'>
                    {showButton('chger')}
                </div>
            </div>
            <div className='filterlist_box'>
                <div className='filterlist_title'>
                    충전 속도
                </div>
                <div className='filterlist_button_group'>
                    {showButton('output')}
                </div>
            </div>
            <div className='filterlist_box'>
                <div className='filterlist_title'>
                    충전소 위치
                </div>
                <div className='filterlist_button_group'>
                    {showButton('loc')}
                </div>
            </div>
            <div className='filterlist_searchButton'>
                <button onClick={sendFilterResult}>검색</button>
            </div>
        </div>
    );
};

export default FilterList;