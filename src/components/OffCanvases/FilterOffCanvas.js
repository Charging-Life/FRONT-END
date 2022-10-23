import React, { useState } from 'react';
import '../../styles/components/OffCanvases/FilterOffCanvas.css';
import { Offcanvas } from 'react-bootstrap';
import FilterList from './FilterList';
import axios from 'axios';

const FilterOffCanvas = ({ show, onHide, finalFilter, setFinalFilter }) => {
    const [filterStation, setFilterStation] = useState({
        limit: [0],
        chger: [0],
        output: [0],
        loc: [0]
    })

    const [buttonGroup] = useState({
        limit: ['전체', '개방', '비개방'],
        chger: ['전체', 'DC차데모', 'AC완속', 'DC차데모+AC3상', 'DC콤보', 'DC차데모+DC콤보', 'DC차데모+AC3상', 'AC3상'],
        output: ['전체', '3kW', '7kW', '50kW', '100kW', '200kW'],
        loc: ['전체', '일반도로', '고속도로']
    });

    const sendFilterResult = () => {
        let limits = filterStation.limit[0] === 0 ? false : filterStation.limit[0] - 1;
        let types = filterStation.chger[0] === 0 ? false : filterStation.chger.map(x => '0' + x);
        let speeds = filterStation.output[0] === 0 ? false : filterStation.output.map(x => {
            let char = buttonGroup.output[x].split('');
            let tempChar = char.filter(y => {
                if (y !== 'k' && y !== 'W') return y;
            }).join('');
            return parseInt(tempChar);
        });
        let locations = filterStation.loc[0] === 0 ? false : `${buttonGroup.loc[filterStation.loc[0]]}`;
        
        setFinalFilter({
            'limits': limits,
            'types': types,
            'speeds': speeds,
            'locations': locations
        });
        onHide();
    }

    return (
        <div className='FilterOffCanvas'>
            <Offcanvas show={show} onHide={onHide} placement='start'
                className='filter_offcanvas'>
                <Offcanvas.Header>
                    <Offcanvas.Title className='filter_offcanvas_title'>검색 필터</Offcanvas.Title>
                    <img src='images/icons/CL_icon_close.png' alt='닫기'
                        className='filter_offcanvas_close'
                        onClick={onHide} />
                </Offcanvas.Header>
                <Offcanvas.Body className='filteroffcanvas_body'>
                    <FilterList
                        filterStation={filterStation}
                        setFilterStation={setFilterStation}
                        buttonGroup={buttonGroup}
                        sendFilterResult={sendFilterResult}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default FilterOffCanvas;