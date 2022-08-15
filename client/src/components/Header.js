import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from 'react-router-dom';


const Header = (props) => {
    const navigate = useNavigate();

    const location = useLocation();

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
    
    //-----------------------------------------------------------------

    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

     // 헤더 버튼을 변경하기 위한 useState
     const [view, setView] = useState({
        SignIn: false
    });
    


    useEffect(() => {
        if (cookies.userInfo === undefined && location.pathname !== '/posedetection/posecam' && location.pathname !== '/posedetection/feedback') {
            setView({
                SignIn: false
            }) 
            navigate("/");
        }else{
            setView({
                SignIn: true
            }) 
        }

    console.log("Cookies >> ", cookies.userInfo);
    console.log("SignIn : ", view.SignIn);
    }, [cookies]);
  

  
    return (
    <Block>
              <header className={scrolled ? 'fix-container scrolled' : 'fix-container'}>
                  <nav>
                  <ul className={(location.pathname.length === 1) ? "nav-list fix-nav" : "nav-list"}>
                              <Headerb>
                              <div className='boxtool'>
                                  <Logo>
                                  <a href="/">
                                      <img src="https://cdn-icons-png.flaticon.com/512/2840/2840214.png" alt="임시 로고" />
                                  </a>
                                  </Logo>
  
                                  {  // 로그인 확인
                                      !view.SignIn ? (
                                          <SideBlock>
                                            <a href="/" >
                                              자세교정
                                            </a>
                                          
                                          </SideBlock>
                                      ) : (
                                          <SideBlock>
                                             <a href="/">
                                              자세교정&nbsp;&nbsp;&nbsp;
                                            </a>
                                              
                                              <a href="/routine" >
                                                운동루틴
                                              </a>
                                          
                                          </SideBlock>
                                          )
                                  }
  
                                  <Box/>
  
                                  {  // 로그인 확인
                                      !view.SignIn ? (
                                      <div>
                                          <Menuli className="span" onClick={() => navigate("/signin")}>로그인</Menuli>
                                          <Menuli className="span" onClick={() => navigate("/signup")}>회원가입</Menuli>
                                      </div>) : (
                                          <div>
                                              <Menuli className="span" onClick={() => {
                                                 setView({
                                                    SignIn: false
                                                }) 
                                                removeCookie("userInfo", { path: "/" });
                                                navigate("/");
                                            }}>로그아웃</Menuli>
                                              <Menuli className="span" onClick={() => navigate(`/${cookies.userInfo.email}/mypage`)}>마이페이지</Menuli>
                                          </div>)
                                  }
                              </div>
                          </Headerb>
                  </ul>
                  </nav>
              </header>
      </Block>
    );
  };

const Headerb = styled.div`
.boxtool{
background-color: white;
width: 100%;
display: inline-flex;
align-items: center;
box-sizing: border-box;
color: white;
}
`

const Logo = styled.div`
justify-content: center;
width: 50px;
margin: 10px 0px 10px 20px;
`

const Menuli = styled.button`
min-width: 100px;
text-align: center;
font-size: 15px;
`

const Box = styled.div`
visibility: hidden;
width: 50%;

`

// 메뉴
const SideBlock = styled.div`
  width: 25%;
  min-width: 170px;
  display: inline-flex;
  margin-left: 20px;

  .span {
    cursor: pointer;
    margin: 5px;
  }

  .span:hover{
    color: grey;
  }
`



const Block = styled.div`

width: 100%;
height: 80px;

.fix-container {
  z-index: 10;
  
    /* &.scrolled {
      box-shadow: //그림자 속성;
  
       .header {
        height: 100px;
        transition: height 0.3s ease;
      } 
      } */  

    .nav-list.fix-nav{
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
`

export default Header;