import React from 'react'
import styled from 'styled-components';
import { theme } from '../../theme';

const FilterDataComponent = ({data, idx}) => {
    console.log(data)
    let none = 0;
    if (data.state === 'None') none++

    console.log(none)

  return (
    <>
        <DataCotainer>
            <div className='flex'>
                <div className='left-box'>
                {data.state}
                {data.state === 'Bad' && 
                    <div className="checkbox">
                    <input id={"checkbox-1" + idx } type="checkbox" />
                    <label htmlFor={"checkbox-1" + idx }>
                        <img src={'/img/check.png'} />
                    </label>
                </div>}
                {data.state === 'Good' && 
                    <div className="checkbox">
                    <input id={"checkbox-2" + idx } type="checkbox" />
                    <label htmlFor={"checkbox-2" + idx } className='checkbox-2-label'>
                        <div className='circle'></div>
                    </label>
                </div>}
                </div>
                <div className='rigth-box'>
                    <p className='part-feedback'>{data.feedback}</p>
                </div>
            </div>
        </DataCotainer>
    </>
  )
}

const Title = styled.strong`
    display: block;
    margin-bottom: 10px;
    font-size : 16px;
`;

const DataCotainer = styled.div`
    ${theme.common.feedbackBoxStyle}
    ${theme.common.feedbackBoxInnerStyle}
    .checkbox-2-label {
        position: relative;
        .circle {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #2c7c35;
        }
    }
    .rigth-box {
        flex: 3;
        .part-feedback {
        letter-spacing: -1.5px;
        font-size : 14px;
        line-height: 1.3;
    }
    }
`;

export default FilterDataComponent
