import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
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

// 메뉴
const SideBlock = styled.div`
  width: 20%;
  position: fixed;
  margin-left: 1%;
  justify-content: center;
  align-items: center;
  display: inline-flex;

  span {
    cursor: pointer;
    margin: 10px;
  }

  span:hover{
    color: grey;
  }
  `



const Block = styled.div`
.fix-container {
    position: fixed;
    top: 0;
    z-index: 10;
    // ...생략
  
    .header {
      height: 150px;
    }
  
    &.scrolled {
      box-shadow: // ...그림자 속성;
  
      .header {
        height: 80px;
        transition: height 0.3s ease;
      }
    }
  }
  `

const Header = (props) => {

  // 1. useState로 scrolled 상태 관리.
  // 처음은 scrollY값이 0일테니, false를 기본값으로 한다.
  const [scrolled, setScrolled] = useState(false);

  // 주의: 빌드할 때 window is not defined 오류를 해결하려면 useEffect
  useEffect(() => {

    // 2. 현재 state 값과 scrollY > 30 을 기준으로 state값 변경하는 함수
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 30) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 30) {
        setScrolled(false);
      }
    };

    // 3. 스크롤 이벤트시 handleScroll 동작
    window.addEventListener('scroll', handleScroll);
    // useEffect cleanup 함수
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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


  return (
  <Block>
            <header className={scrolled ? 'fix-container scrolled' : 'fix-container'}>
            <div className="header">
                <nav>
                <ul className="nav-list">
                            <Headerb>
                            <div className='boxtool'>
                                <Logo>
                                <a href="/">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2840/2840214.png" alt="임시 로고" />
                                </a>
                                </Logo>

                                {  // 로그인 확인
                                    view.SignIn ? (
                        
                                        <SideBlock>
                                            <Link to="2" spy={true} smooth={true}>
                                                <span>자세교정</span>
                                            </Link>
                                        </SideBlock>
                                    ) : (
                                        <SideBlock>
                                            <Link to="2" spy={true} smooth={true}>
                                                <span>자세교정</span>
                                            </Link>
                                            <Link to="3" spy={true} smooth={true}>
                                                <span>운동루틴</span>
                                            </Link>
                                        </SideBlock>)
                                }

                                <Box/>

                                {  // 로그인 확인
                                    view.SignIn ? (
                                    <div>
                                        <a href="/signin" ><Menuli><span>로그인</span></Menuli></a>
                                        <a href="/signup"><Menuli><span>회원가입</span></Menuli></a>
                                    </div>) : (
                                        <div>
                                            <a href="/"><Menuli><span>로그아웃</span></Menuli></a>
                                            <a href="/mypage"><Menuli><span>마이페이지</span></Menuli></a>   
                                        </div>)
                                }
                            </div>
                        </Headerb>
                </ul>
                </nav>
            </div>
            </header>
    </Block>
  );
};

export default Header;