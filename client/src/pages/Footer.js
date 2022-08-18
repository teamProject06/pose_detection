import React from 'react';
import styled from 'styled-components';
import { useLocation} from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    
    //메인 화면에서는 footer 제외
    if(location.pathname === "/routine/routinecam") return null;
    if(location.pathname === "/posedetection/posecam") return null;

  return (
    <Container>
         <div className='wrap'>

                <footer>
                    <nav>
                        <a href='https://github.com/teamProject06/pose_detection' target='_blank'>Github</a>&#124;
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
         
        </div>
    </Container>
  )
}

const Container = styled.div`

.wrap {
    position: relative;
  min-height: 100%;
  width: 100%;
  padding-bottom: 114px;
}


footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #c4c4c4;
  padding-top: 15px;
  color: #808080;
  font-size: 11px;
}

footer a {
  display: inline-block;
  margin: 0 20px 10px 20px;
  color: #808080; font-size: 11px;
}

footer a:visited {
  color: #808080;
}

footer p {
  margin-top: 0; 
  margin-bottom: 0;   
}

footer p span {
  display: inline-block;
  margin-left: 20px;
}

`;


export default Footer;
