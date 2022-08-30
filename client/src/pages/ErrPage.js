import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const ErrPage = ({setIsPath}) => {
    const naviation = useNavigate()

    useEffect(() => {
        setIsPath(false)
    }, [])

  return (
    <ErrContainer>
        <img src={'/img/errGif.gif'} alt="점검중입니다" className='err-img'/>
        <p>개발 중인 페이지입니다.</p>
        <button onClick={()=> naviation(-1)}>뒤로가기</button>
    </ErrContainer>
  )
}

const ErrContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .err-img {
        margin-top: 5em;
        width: 300px;
        height: 300px;
        object-fit: cover;
    }
    button {
        margin-top: 2em;
        border-bottom: 1px solid black;
        padding-bottom: 6px;

    }
`;

export default ErrPage