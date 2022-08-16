import React,{useEffect} from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { useCookies } from 'react-cookie';
import $ from 'jquery';
import axios from 'axios';
import port from "./../../data/port.json"; //url


const UserRoutine = () => {
  // const [userRoutine, setUserRoutine] = useState([{}]);
  let userRoutine;
  let tmpRoutine = [];
  let tmpTableBody;
  let click = false;
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

  useEffect(()=>{
    getList();
  },[])

  const getList = async() => { //data불러와서 userRoutine에 저장
    $(".tableBody").empty();
    try {
      await axios.get(port.url + '/routine',
        // {
        //   headers: {
        //     accessToken: cookies.userData.accessToken
        //   }
        // }
      ).then((res) => {
        userRoutine = [];
        tmpRoutine = res.data;
        console.log(tmpRoutine, 'tmpRoutine'); //배열
        for (var i in tmpRoutine) {
          let name = tmpRoutine[i].name;
          let time = tmpRoutine[i].time;
          let routine ="";
          for (var j in tmpRoutine[i].routine){
            let count = tmpRoutine[i].routine[j].count;
            let excercise = tmpRoutine[i].routine[j].name;
            let oneRoutine = `${excercise}(${count})`;
            if (j==0) routine = routine + oneRoutine;
            else routine = routine + ' - '+ oneRoutine;
          }
          userRoutine.push({
            "name": name,
            "time": time,
            "routine": routine,
          })
        }
      })
    }
    catch (e) {
      console.log(e);
    }
    userRoutine.map((it, index) => {
      tmpTableBody = `<tr>
        <td scope="row">${index + 1}</td> 
        <td>${it.name}</td>
        <td>${it.routine}</td>
        <td>${it.time}</td>
      </tr>`;
      $('.tableBody').append(tmpTableBody);
    })
    click = true;
  }

  

  return (
    <SQUARE>
      <Label onClick={getList}>실시간 업데이트</Label>
      <Label>다른 회원 루틴을 참고해서 루틴을 등록해보세요!</Label>
      <Table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Routine</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody className='tableBody'></tbody>
      </Table>
    </SQUARE>
  )
}

const SQUARE = styled.div`
        justify-content: center;
        background-color: white;
        width: 95%;
        min-width: 95%;
        margin : 0 2.5% 20px;
        margin-bottom: 30px;`

const Label = styled.div`
  text-align: right;
  font-size : 13px;
  margin-bottom: 1%;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`

const Table = styled.table`
width: 100%;
border-collapse: collapse;
th{
  font-size: 15px;
  font-weight: 900;
  border: 0.5px solid white;
  background-color: #1d1d1d;
  color : white;
  padding : 2% 0;
}
td{
  font-size: 13px;
  font-weight: 500;
  border-right : 0.5px solid #dae1e6;
  border-left : 0.5px solid #dae1e6;
  border-bottom : 0.5px solid #dae1e6;
  padding : 20px 0;
}`
export default UserRoutine;