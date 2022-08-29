import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = ({isPath, setIsPath}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/') return setIsPath(false)
      if (location.pathname !== '/') return setIsPath(true)
    }, [location.pathname])


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

  
    // home 화면으로 가기
    useEffect(() => {
      if (cookies.userInfo === undefined && location.pathname !== '/posedetection/posecam' && location.pathname !== '/' ) {
        setView({
            SignIn: false
        }) 
        navigate("/home");
    }else{
        setView({
            SignIn: true
        }) 
    }

console.log("Cookies >> ", cookies.userInfo);
console.log("SignIn : ", view.SignIn);
  }, [cookies]);
    
  

  
    return (
      <>
    {isPath && <Block>
              <header className={scrolled ? 'fix-container scrolled' : 'fix-container'}>
                  <nav>
                  <ul className={(location.pathname.length === 1) ? "nav-list fix-nav" : "nav-list"}>
                              <Headerb>
                              <div className='boxtool'>
                                  <Logo>
                                  <Link to="/home">
                                    <h1 className='font'>FITBACK</h1>
                                  </Link>
                                  </Logo>
  
                                  {  // 로그인 확인
                                      !view.SignIn ? (
                                          <SideBlock>
                                            <Link to="/posture" >
                                           
                                              자세교정
                                           
                                            </Link>
                                          
                                          </SideBlock>
                                      ) : (
                                          <SideBlock>
                                             <Link to="/posture">
                                             
                                              자세교정&nbsp;&nbsp;&nbsp;
                                            
                                             </Link>
                                              
                                              <Link to="/routine/routinecreate" >
                                                운동루틴&nbsp;&nbsp;&nbsp;&#124;
                                              </Link>


                                              <Link to="/mycalendar">
                                              &nbsp;&nbsp;루틴캘린더&nbsp;&nbsp;&nbsp;
                                              </Link>

                                              <Link to="/myfeedback" >
                                                자세피드백
                                              </Link>
                                          
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
                                                //oauth도 삭제하기
                                                removeCookie("userInfo", { path: "/" });
                                                navigate("/home");
                                            }}>로그아웃</Menuli>
                                              <Menuli className="span" onClick={() => navigate(`/${cookies.userInfo.email}/mypage`)}>마이페이지</Menuli>
                                          </div>)
                                  }
                              </div>
                          </Headerb>
                  </ul>
                  </nav>
              </header>
      </Block>}
      </>
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
width: 70px;
margin: 10px 10px 20px 10px;


.font{
    font-weight: bold;
    font-size: 2.1rem;
    
  }
`

const Menuli = styled.button`
width: 100%;
min-width: 80px;
text-align: center;
font-size: 14px;

.span {
    cursor: pointer;
    margin: 5px;
  }

  .span:hover{
    color: grey;
  }
`

const Box = styled.div`
visibility: hidden;
width: 50%;

`

// 메뉴
const SideBlock = styled.div`
  width: 32%;
  min-width: 355px;
  font-size: 14px;
  display: inline-flex;
  margin-left: 70px;

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