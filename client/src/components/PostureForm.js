import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const PostureForm = () => {

  const navigate = useNavigate();

  const ClickSquart = () =>{
    localStorage.setItem('posture', '스쿼트');
    navigate("/posedetection/posecam")
  }

  const ClickLunji = () =>{
    localStorage.setItem('posture', '런지');
    navigate("/posedetection/posecam")
  }

  const ClickOneArm = () =>{
    localStorage.setItem('posture', '원암덤벨로우');
    navigate("/posedetection/posecam")
  }


    return (
        <Block>
            <p className='font'>교정할 자세를 선택하세요.</p>
            <div className="d-flex gap-5 justify-content-center">
                <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-5000px">
                    <li className="dropdown-item rounded-2"><button onClick={ClickSquart}>스쿼트</button></li>
                    <li className="dropdown-item rounded-2"><button onClick={ClickLunji}>런지</button></li>
                    <li className="dropdown-item rounded-2"><button onClick={ClickOneArm}>원암덤벨로우</button></li>
                </ul>
            </div>
        </Block>
    );
}

const Block = styled.div`
  .font{
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 20px;
    margin-bottom: 20px;
  }
`


export default PostureForm;
