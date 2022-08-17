import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

function Loader({ type, color, message }) {
    return (
        <div class="contentWrap">
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <ReactLoading
                    type={type}
                    color={color}
                    height={'50px'}
                    width={'50px'} />
                <Label>{message}</Label>
            </div>
        </div>
    );}

    const Label = styled.div`
    text-align: left;
    font-size : 12px;
    margin : 0% 7% 0%;
    font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`
{/* 
-> 페이지에 쓰기
<Loader type="cylon" color="black" message={"message"} /> */}

export default Loader;