import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import $ from 'jquery';
import axios from 'axios';
import port from "../../data/port.json"; //url


const MyPageRoutine = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

    let myRoutine =[];
    let tmpRoutine = [];
    let tmpTableBody;
    let routine = "";
    let click = false;

    useEffect(()=>{
        getList();
    },[])

    const getList = async() => { //data불러와서 myRoutine에 저장
        const UserName = cookies.userInfo.name;

        try {
        await axios.get(port.url + '/routine',
        ).then((res) => {
            myRoutine = [];
            tmpRoutine = res.data;
            console.log(tmpRoutine, 'tmpRoutine'); // 전체 데이터
            $(".Bodyr").empty();
            
            for (var i in tmpRoutine) {
                if(UserName === tmpRoutine[i].name){
                    //let time = tmpRoutine[i].time;
                    routine ="";

                    for (var j in tmpRoutine[i].routine){
                        let count = tmpRoutine[i].routine[j].count;
                        let excercise = tmpRoutine[i].routine[j].name;
                        let oneRoutine = `${excercise} ${count}회`;

                        if (j == 0) {
                            routine = routine + oneRoutine;
                        }
                        else routine = routine + ' > '+ oneRoutine;
                    }
        
                    myRoutine.push({
                        //"time": time,
                        "routine": routine
                    })
                }
            }
            myRoutine.map((it, index) => {
                tmpTableBody = `
                    <p>${it.routine}</p>
                    </br>
                `;
                $('.Bodyr').append(tmpTableBody);
            })
        })
        }catch (e) {
        console.log(e);
        }

    }

  return (
    <Container>
        <div className='head'>
            <p className='box'>ROUTINE</p>
        </div>

        {/* <Parent>
            <Box>루틴예시</Box>
        </Parent> */}

        <div className='Bodyr Parent'></div>
    </Container>
   
  )
}


const Container = styled.div`

.head{
    display: flex;
    text-align : center;
  width: 60%;
  padding: 10px;
  padding-bottom: 20px;
  min-width: 500px;
  margin: 0 auto;
  margin-bottom: 2px;
  font-size : 14px;
  font-weight: 600;
  //border-bottom: 1px grey solid;
}

.box{
    float: left;
    width: 30%;
    margin: 10px;
    margin: 0 auto;
  }

  .parent{
    display: flex;
    text-align : center;
    width: 80%;
    border: 1px grey solid;
    border-radius: 10px;
    padding: 10px;
    padding-top: 50px;
    padding-bottom: 50px;
    min-width: 500px;
    margin: 0 auto;
    margin-bottom: 15px;
    box-shadow:0 3px 3px rgba(0, 0, 0, 0.7);
  }

`;

const Parent = styled.div`
    display: flex;
    text-align : center;
    width: 80%;
    border: 1px grey solid;
    border-radius: 10px;
    padding: 10px;
    padding-top: 50px;
    padding-bottom: 50px;
    min-width: 500px;
    margin: 0 auto;
    margin-bottom: 15px;
    box-shadow:0 3px 3px rgba(0, 0, 0, 0.7);
`;

const Box = styled.div`
    float: left;
    width: 30%;
    margin: 10px;
    margin: 0 auto;
`;




export default MyPageRoutine;
