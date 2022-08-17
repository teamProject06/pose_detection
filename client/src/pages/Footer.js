import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    //메인 화면에서는 footer 제외
    if(window.location.pathname === "/") return null;

  return (
    <Container>
         <div id='wrap'>

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

#wrap {
  //height : auto;
  //min-height: 950px;
  padding-bottom: 100px;
  position: relative;
  width: 100%; 
}

footer {
  width: 100%;
  height: 100px;
  bottom: 0;
  position: absolute;
  //transform : translateY(-300%);
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
  margin-top: 0; margin-bottom: 0;   
}

footer p span {
  display: inline-block;
  margin-left: 20px;
}

`;


export default Footer;
