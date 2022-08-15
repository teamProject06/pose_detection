import React, { useEffect} from 'react';
import styled, { createGlobalStyle } from "styled-components";
import $ from 'jquery';

const UserRoutine = () => {
  /*_____________________data_______________________*/
  useEffect(()=>{
    getList();
  },[]);

  let tmpTableBody;

  const userRoutine = [
    
    {
      name : "이나영1",
      routine : ["routine1", "routine2", "routine3"],
      date : "2022-08-14",
    },
    {
      name : "이나영2",
      routine : ["routine1", "routine2", "routine3"],
      date : "2022-08-14",
    },
    {
      name : "이나영3",
      routine : ["routine1", "routine2", "routine3"],
      date : "2022-08-14",
    },
    {
      name : "이나영4",
      routine : ["routine1", "routine2", "routine3"],
      date : "2022-08-14",
    },
    {
      name : "이나영5",
      routine : ["routine1", "routine2", "routine3"],
      date : "2022-08-14",
    }
  ]

  const getList = () => {
    $(".tableBody").empty();
    userRoutine.map((it,index) => {
      tmpTableBody = `<tr>
      <td scope="row">${index + 1}</td> 
      <td>${it.name}</td>
      <td>${it.routine}</td>
      <td>${it.date}</td>
    </tr>`;
    $('.tableBody').append(tmpTableBody);
    })
  }
  /*_____________________data_______________________*/
  
  return (
    <SQUARE>
      {/* <Label>다른 회원 루틴을 참고해서 루틴을 등록해보세요!</Label> */}
      <Table>
        <thead>
          <tr>
            <th scope = "col"></th>
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
        height: 570px;
        width: 95%;
        margin : 0 2.5% 20px;
        margin-bottom: 5%;`

const Label = styled.div`
  text-align: right;
  font-size : 13px;
  margin-bottom: 3%;
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