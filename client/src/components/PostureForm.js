import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const PostureForm = () => {

  const navigate = useNavigate();

  const ClickSquart = () =>{
    localStorage.setItem('posture', '스쿼트');
    navigate("/posedetection/posecamguide")
  }

  const ClickLunji = () =>{
    localStorage.setItem('posture', '런지');
    navigate("/not")
  }

  const ClickOneArm = () =>{
    localStorage.setItem('posture', '원암덤벨로우');
    navigate("/not")
  }


    return (
        <Block>
            <p className='font'>교정할 자세를 선택하세요.</p>
            <div className="d-flex gap-5 justify-content-center">
                <ul className="dropdown-menu position-static d-grid p-2 rounded-2 w">
                    <li className="dropdown-item rounded-2" onClick={ClickSquart}><button>스쿼트</button></li>
                    <li className="dropdown-item rounded-2" onClick={ClickLunji}><button>런지</button></li>
                    <li className="dropdown-item rounded-2" onClick={ClickOneArm}><button>원암덤벨로우</button></li>
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
    margin-bottom: 60px;
  }

  .w{
    width: 50%;
    min-width: 30%;
    margin-bottom: 10%;
  }
`


export default PostureForm;
