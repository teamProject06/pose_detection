import React from 'react'
import styled from 'styled-components';

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
                    {data.state !== 'None' && <Title>{data.part}</Title>}
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
    font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`;

const DataCotainer = styled.div`
    border-radius: 20px;
    background-color:  #f5f5f5;
    padding: 1em 1.3em;
    box-shadow:  inset 1px 1px 2px #BABECC, inset -1px -1px 2px #fff;
    margin-bottom: 1em;
    .flex {
        display: flex;
        .left-box {
            flex: 0;
            margin-right: 12px;
            .checkbox {
                margin-top: 10px;
                input {
                    display: none;
                }
                input:checked+label {
                    box-shadow:  inset .2rem .2rem .5rem #BABECC, 
                        inset -.2rem -.2rem .5rem #fff;
                }
                label {
                box-shadow: .3rem .3rem .6rem #c8d0e7, 
                    -.2rem -.2rem .5rem #fff;
                    cursor: pointer;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                    border-radius: .5rem;
                    width: 1.2rem;
                    height: 1.2rem;
                    padding: .3em;
                        }
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
      

    }
`;

export default FilterDataComponent
