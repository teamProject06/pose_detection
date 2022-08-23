import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DropDown from '../components/DropDown';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { theme } from "../../src/theme";

const Home = () => {
    const navigate = useNavigate();

const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const ClickSquart = () =>{
    localStorage.setItem('posture', '스쿼트');
    navigate("/posedetection/posecamguide")
  }

  const ClickLunji = () =>{
    localStorage.setItem('posture', '런지');
    navigate("/posedetection/posecamguide")
  }

  const ClickOneArm = () =>{
    localStorage.setItem('posture', '원암덤벨로우');
    navigate("/posedetection/posecamguide")
  }

 

  return (
            <Block>
            <h1 className='font'><button className='font' onClick={() => navigate("/signin")}>FITBACK</button></h1>
            <div className='boxm'>
                <button className='downbox' onClick={e => setDropdownVisibility(!dropdownVisibility)}>
                    {
                        dropdownVisibility? <FaAngleUp />: <FaAngleDown />
                    }
                    &nbsp; 운동 선택 시 자세교정이 시작됩니다.  &nbsp;
                </button>
                {/* <video loop autoPlay="autoPlay" muted="muted">
                    <source src="./img/run.mp4" type="video/mp4"></source>
                </video> */}
            </div>
    
    
            <div className='boxm'>
                <DropDown visibility={dropdownVisibility}>
                    <ul className='txt'>
                        <li className='m' onClick={ClickSquart}><button>스쿼트</button></li>
                        <li className='m' onClick={ClickLunji}><button>런지</button></li>
                        <li className='m' onClick={ClickOneArm}><button>원암덤벨로우</button></li>
                    </ul>
                </DropDown>
            </div>
        </Block>
)
}

const Block = styled.div`

    background-image: url("/img/background2.jpg");
    background-size: cover; 
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;

    //display: flex;
    display:table;
  justify-content: center;
  align-items:center;
  min-height: 100vh;

    .font{
    font-weight: bold;
    font-size: 2.1rem;
    color: white;
    justify-content: center;
  text-align: center;
  margin: 0 auto;
  margin-top: 8%;
  }

    

/* fade in */
@keyframes slide-fade-in-dropdown-animation {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}

.slide-fade-in-dropdown {
  overflow: hidden;
}

.slide-fade-in-dropdown > ul {
  animation: slide-fade-in-dropdown-animation .4s ease;
}

/* fade out */
@keyframes slide-fade-out-dropdown-animation {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}

.slide-fade-out-dropdown {
  overflow: hidden;
}

.slide-fade-out-dropdown > ul {
  animation: slide-fade-out-dropdown-animation 0.4s ease;
  animation-fill-mode: forwards;
}

.components-dropdown > ul {
  position: relative;
  top: 5px;
  margin-top: 0;
  margin-bottom: 5px;
  padding-left: 0;
  list-style: none;
}

.downbox {
  //height: 50px;
  //height: 100vh;
  padding: 17px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 40px; 
  margin-top: 40px;
  //margin-bottom: 50px;
  background-color: white;
  align-items: center;
  justify-content: center;
}

.boxm{
    justify-content: center;
  text-align: center;
  margin: 0 auto;
}


.txt{
    height: 120px;
    //width: 20%;
    padding-left: 10px;
    padding-top: 10px;
    padding-right: 10px;
    margin-left: 39%;
    margin-right: 39%;
    background-color: white;
  border-radius: 20px; 
}

.m{
    margin-top: 13px;
    margin-left: 20px;
    margin-bottom: 13px;
}
.m:hover{
    color: #061673;
}
 
`


export default Home;