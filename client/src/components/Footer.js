import React from 'react';
import styled from 'styled-components';
import { useLocation} from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    
    //메인 화면에서는 footer 제외
    if(location.pathname === "/routine/routinecam") return null;
    if(location.pathname === "/posedetection/posecam") return null;
    if(location.pathname === "/posedetection/posecamguide") return null;
    if(location.pathname === "/") return null;
    if(location.pathname === "/not") return null;

  return (
        <FooterContainer className={location.pathname === '/home' ? 'main-footer' : ''}>
          <footer className={location.pathname === '/routine/routinecreate' ? 'routine-footer' : '' }>
            <nav>
                <a href='https://github.com/vteamProject06/pose_detection' target='_blank'>Github</a>&#124;
                <a href='https://www.notion.so/2022-AI-6-6c72c19b3cb349fabef7fd339660072e' target='_blank'>Notion</a>
            </nav>
            <br/>

            <p>
                <span>Developer : Seungyeon Lee &#124; Nayoung Lee &#124; Yurim Choi</span><br/><br/>
                <span>&copy;2022Team6</span><br/>
                <span>Copyright 2022. All Rights Reserved.</span><br/>
            </p>
            <br/> 
          </footer>
        </FooterContainer>
  )
}

const FooterContainer = styled.div`
  width: 100%;
  padding-top: 100px;
  color: #808080;
  font-size: 11px;
  &.main-footer {
    padding-top: 0;
  }
  nav {
    border-top: 1px solid #c4c4c4;
    padding-top: 15px;
  }
  a {
  display: inline-block;
  margin: 0 20px 10px 20px;
  color: #808080; font-size: 11px;
}

 a:visited {
  color: #808080;
}

 p {
  margin-top: 0; 
  margin-bottom: 0;   
}

 p span {
  display: inline-block;
  margin-left: 20px;
}

`;


export default Footer;
