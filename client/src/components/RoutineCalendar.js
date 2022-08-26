import React, { useEffect, useState, useRef, useCallback } from 'react'
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import styled from 'styled-components';

const initialEvents = [
  {
    id: '1',
    calendarId: 'cal1',
    title: 'Lunch',
    category: 'time',
    start: '2022-08-29T12:00:00',
    end: '2022-08-29T13:30:00',
  },
  {
    id: '2',
    calendarId: 'cal1',
    title: 'Coffee Break',
    body: '스쿼트 4회, 럼비 4뢰',
    state: null,
    attendees: ['user'],
    category: 'time',
    start: '2022-08-28T15:00:00',
    end: '2022-08-28T15:30:00',
  },
  {
    id: '3',
    calendarId: 'cal1',
    title: 'test',
    body: '런지 4회, 럼비 4뢰',
    state: null,
    attendees: ['user'],
    category: 'time',
    start: '2022-08-28T15:00:00',
    end: '2022-08-28T15:30:00',
    backgroundColor: 'red'
  },
];

const calendars = [{ id: 'cal1'}];

const RoutineCalendar = () => {
  const calendarRef = useRef(null)
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);


  const onAfterRenderEvent = (event) => {
    console.log(event.title);
  };

  const updateRenderRangeText = () => {
    const now = new Date()

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let dateRangeText;


    const start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
    const end = `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
        }${date}`;
        dateRangeText = `${start} ~ ${end}`;
        dateRangeText = `${year}-${month}-${date}`;

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
          <span>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-today"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-next"
            onClick={onClickNavi}
          >
            Next
          </button>
        </span>
        <span className="render-range">{selectedDateRangeText}</span>
          <Calendar
          ref={calendarRef}
        height="500px"
        view="month"
        month={{
          dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          visibleWeeksCount: 0, 
        }}
        isReadOnly="true"
        useDetailPopup="true"
        calendars={calendars}
        events={initialEvents}
        onAfterRenderEvent={onAfterRenderEvent}
      />
      </Container>
    );
  }

const Container = styled.div`
  .toastui-calendar-detail-container .toastui-calendar-section-button {
    display: none;
  }
`;

export default RoutineCalendar