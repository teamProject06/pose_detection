import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import $ from 'jquery';
import axios from 'axios';
import port from "../../data/port.json"; //url


const MyPageRoutine = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

    let myRoutine;
    let tmpRoutine = [];
    let tmpTableBody;
    let click = false;

    useEffect(()=>{
        getList();
    },[])

    const getList = async() => { //data불러와서 myRoutine에 저장
        $(".tableBody").empty();

        //console.log("로그인 이름:", cookies.userInfo.name);
        const UserName = cookies.userInfo.name;

        try {
        await axios.get(port.url + '/routine',
        ).then((res) => {
            myRoutine = [];
            tmpRoutine = res.data;
            console.log(tmpRoutine, 'tmpRoutine'); //배열
            
            for (var i in tmpRoutine) {
                //console.log("i name : ", tmpRoutine[i].name);
                if(UserName === tmpRoutine[i].name){
                    //let name = tmpRoutine[i].name;
                    let time = tmpRoutine[i].time;
                    let routine ="";

                    for (var j in tmpRoutine[i].routine){
                        let count = tmpRoutine[i].routine[j].count;
                        let excercise = tmpRoutine[i].routine[j].name;
                        let oneRoutine = `${excercise}(${count})`;

                        if (j === 0) routine = routine + oneRoutine;
                        else routine = routine + ' - '+ oneRoutine;
                    }
        
                    myRoutine.push({
                        "time": time,
                        "routine": routine
                    })
                }
            }
        })
        }catch (e) {
        console.log(e);
        }

        myRoutine.map((it, index) => {
            tmpTableBody = `
            <Parent>
                <Box>${it.routine}</Box>
            </Parent>
            `;
            $('.tableBody').append(tmpTableBody);
          })

          click = true;
    }

  return (
    <Container>
        <div className='head'>
            <p className='box'>ROUTINE (TIME)</p>
        </div>

        <Parent>
            <Box>루틴예시</Box>
        </Parent>

        <tbody className='tableBody'></tbody>
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
    width: 90%;
    border: 1px grey solid;
    border-radius: 10px;
    padding: 10px;
    padding-top: 50px;
    padding-bottom: 50px;
    min-width: 500px;
    margin: 0 auto;
    margin-bottom: 15px;
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
`;

const Box = styled.div`
    float: left;
    width: 30%;
    margin: 10px;
    margin: 0 auto;
`;




export default MyPageRoutine;
