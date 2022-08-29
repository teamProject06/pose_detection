import React, { useEffect, useState, useRef, useCallback } from 'react'
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import styled from 'styled-components';
import axios from 'axios';
import port from "../data/port.json";
import { useCookies } from "react-cookie";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const initialEvents = [
  {
    id: '1',
    calendarId: 'mycalendar',
    title: 'Lunch',
    category: 'time',
    start: '2022-08-29T12:00:00',
    end: '2022-08-29T13:30:00',
  },
];

const calendars = [{ id: 'mycalendar'}];

const RoutineCalendar = () => {
  const calendarRef = useRef(null)
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const [calendarInitialList, setCalendarInitialList] = useState([])
  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);
  const name = cookies.userInfo.name

  const getRoutineData = async () => {
    return await axios.get(`${port.url}/routine/${name}/mypage`)
                  .then(res => {
                    makeData(res.data, name)
                  })
                  .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getRoutineData()
    
  }, [])

  const makeData = (data, name) => {
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
      const timeToString = new Date(data[i].time).toISOString()
      const routineTime = timeToString.split('.')
        const myCalendarObj = {
          id: `${name} ${Math.floor(Math.random() * 100000)}`,
          calendarId: 'mycalendar',
          title: '',
          body: '',
          state: null,
          attendees: [name],
          category: 'time',
          start: routineTime[0],
          end: routineTime[0],
          backgroundColor: '#061673',
        };
  
        let bodyText = '';
        let routineLevel = 0;
        for(let j = 0; j < data[i].routine.length; j++) {
          bodyText += data[i].routine[j].name
          if (data[i].routine[j].isActive) {
            bodyText += `${data[i].routine[j].count}회, `
          } else {
            bodyText += `${data[i].routine[j].count}초, `
          }
          routineLevel ++
          myCalendarObj['body'] = bodyText.slice(0, bodyText.length-2)
        }
        
        if (routineLevel >=7) {
          myCalendarObj['title'] = 'Hard Routine'
        } else if (routineLevel > 3) {
          myCalendarObj['title'] = 'Medium Routine'
        } else {
          myCalendarObj['title'] = 'Easy Routine'
        }
  
        setCalendarInitialList([...calendarInitialList, myCalendarObj])
        console.log(myCalendarObj, 'eeeeeeeeeeeeeeeeeeeeeeee')
      }
      console.log(calendarInitialList)
  }




  const updateRenderRangeText = () => {
    let dateRangeText = ''
    const date = getCalInstance().getDate();
    const rangeStart = getCalInstance().getDateRangeStart();
    const rangeEnd = getCalInstance().getDateRangeEnd();
    let startYear = rangeStart.getFullYear();
    let startMonth = rangeStart.getMonth() + 1;
    let startDay = rangeStart.getDate();
    let endYear = rangeEnd.getFullYear();
    let endMonth = rangeEnd.getMonth() + 1;
    let endDay = rangeEnd.getDate();


    
    dateRangeText = `${startYear}-${startMonth}-${startDay} ~ ${endYear}-${endMonth}-${endDay}`;
        
    setSelectedDateRangeText(dateRangeText);
  }

  useEffect(()=> {
    updateRenderRangeText()
  }, [])

  const onClickNavi = (ev) => {
    if (ev.target.tagName === 'BUTTON') {
      const button = ev.target;
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '');
      getCalInstance()[actionName]();
      updateRenderRangeText();
    }
  };

    return (
      <Container>
          <MenuContainer onClick={onClickNavi} >
            <span className='date-text'>{selectedDateRangeText}</span>
          <button
            type="button"
            data-action="move-today"
            className='button today'
          >
            Today
          </button>
          <button
            type="button"
            data-action="move-prev"
            className='button move'
          >
            <FaAngleLeft onClick={()=>{
              getCalInstance()['prev']();
              updateRenderRangeText();
            }}/>
          </button>
          <button
            type="button"
            data-action="move-next"
            className='button move'
          >
            <FaAngleRight onClick={()=>{
              getCalInstance()['next']();
              updateRenderRangeText();
            }} />
          </button>
        </MenuContainer>
          <Calendar
          ref={calendarRef}
        height="350px"
        view="month"
        month={{
          dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          visibleWeeksCount: 3, 
        }}
        isReadOnly="true"
        useDetailPopup="true"
        calendars={calendars}
        events={calendarInitialList}
      />
      </Container>
    );
  }

const Container = styled.div`
  position: relative;
  width: 80%;
  margin: 50px auto;
  padding: 5em 2em 0;
  .toastui-calendar-detail-container .toastui-calendar-section-button {
    display: none;
  }
  .toastui-calendar-template-time strong {
    display: none;

  }
`;

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 2em;
  top: 1em; 
  .date-text {
    font-size: 18px;
    margin-right: 10px;
  }
  .button {
    border: 1px solid #ddd;
    z-index: 10;
  }
  .button.today {
    border-radius: 15px;
    padding: .7em 1em;
    margin-right: 10px;
  }
  .button.move {
    border-radius: 50%;
    padding: .5em;
    margin-right: 10px;
  }
  `;


export default RoutineCalendar