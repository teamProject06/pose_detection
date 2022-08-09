import React, { useState, useEffect } from 'react'
import styled from 'styled-components';


const Headerb = styled.div`

.boxtool{
width: 100%;
height: 7%;
display: inline-flex;
padding: 10px 20px;
margin-top:1%;
margin-left: 1%;
border-radius: 0px 0px 30px 30px;
align-items: center;
position: fixed;
}
`

const Logo = styled.div`
justify-content: center;
width: 80px;
height: 80px;
padding: 1%;
`

const Menuli = styled.button`
text-align: center;
font-size: 15px;
margin-right: 20px;
`

const Box = styled.div`
visibility: hidden;
width: 80%;
`
const Header = () => {

    // 헤더 버튼을 변경하기 위한 useState
    const [view, setView] = useState({
        SignIn: false
    });


    // 로그인 입력받을 데이터를 props로 넘겨줌
    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });


    // signInData값이 변경될 때 확인 가능(console)
    useEffect(() => {
        console.log(signInData);

        // 로그인 값이 있으면 로그인된 상태로 간주
        if(signInData){
            setView({
                SignIn: true
            }) 
        }
    }, [signInData]);


    return(
        <header>
            <Headerb>
                <div className='boxtool'>
                    <Logo>
                    <a href="/">
                        <img src="https://cdn-icons-png.flaticon.com/512/2840/2840214.png" alt="임시 로고" />
                    </a>
                    </Logo>
        
                    <Box/>
                    {  // 로그인 확인
                        view.SignIn ? (
                        <div>
                            <a href="/signin" > <Menuli>로그인</Menuli></a><a href="/signup"><Menuli>회원가입</Menuli></a>
                            </div>) : (<div>
                            <a href="/" > <Menuli>로그아웃</Menuli></a><a href="/mypage"><Menuli>마이페이지</Menuli></a>
                            </div>)
                    }
                </div>
            </Headerb>
        </header>
    )
}

export default Header;
