import React, { useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import TripDate from './TripDate';
import AttractionAddForm from './AttractionAddForm';
import Attraction from './Attraction';
import Carousel from './Carousel';
import { ScheduleContext } from '../context/ScheduleContext';
import { TripDateContext } from '../context/TripDateContext';


const TripDateDetail = styled.div`
  animation: fadeOut 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ScheduleDetail = () => {
  const {savedData, schedules, setSchedules, activateSchedule, setActivateSchedule } = useContext(ScheduleContext);
  const {activateDate, setActivateDate} = useContext(TripDateContext);
  const [attractions, setAttractions] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (savedData) { 
      setAttractions(savedData.find(schedule => schedule.ScheduleName == activateSchedule)?.ScheduleDetail);
    }

    updateDates();
    const savedActivateDate = loadDateSelectedLastTime();
    if (savedActivateDate) {
      setActivateDate(savedActivateDate.date);
    } else {
      if (dates.length > 0) {
        setActivateDate(dates[0]);
      } else {
        setActivateDate("");
      }
    }
  }, [activateSchedule]);

  useEffect(() => {
    updateDates();
  }, [attractions]);

  useEffect(() => {
    console.log("attractions:", attractions);
}, [attractions]);

  const updateDates = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let tmp = [];
    let writed = [];
    attractions?.forEach(d => {
      if (writed.indexOf(d.yymmdd) === -1) {
        writed.push(d.yymmdd);
        tmp.push({ yymmdd: d.yymmdd, weekday: weekdays[new Date(d.yymmdd).getDay()] });
      }
    });
    const sortedTmp = tmp.sort((a, b) => {
      const dateA = new Date(a.yymmdd);
      const dateB = new Date(b.yymmdd);
      if (dateA.getTime() === dateB.getTime()) {
        return a.weekday.localeCompare(b.weekday);
      }
      return dateA - dateB;
    });
    setDates(sortedTmp);
  };

  const loadDateSelectedLastTime = () => {
    const activateDates = JSON.parse(localStorage.getItem("activateDates")) || [];
    const activateDate = activateDates.find(schedule => schedule.ScheduleName === activateSchedule);
    return activateDate;
  };
  

  const removeAttraction = (index) => {
    const newAttractions = [...attractions];
    newAttractions.splice(index, 1);
    setAttractions(newAttractions);
    saveDataToLocalStorage(newAttractions);
  };

  const addAttraction = (newAttraction) => {
    newAttraction.yy = new Date(newAttraction.yymmdd).getFullYear();
    newAttraction.mmdd = new Date(newAttraction.yymmdd).getMonth() + 1 + "/" + new Date(newAttraction.yymmdd).getDate();
    const newAttractions = [...attractions, newAttraction];
    setAttractions(newAttractions);
    saveDataToLocalStorage(newAttractions);
    
  };

  const saveDataToLocalStorage = (data) => {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const existingSchedule = schedules.find(schedule => schedule.ScheduleName === activateSchedule);
    if (existingSchedule) {
      existingSchedule.ScheduleDetail = data;
    }
    localStorage.setItem('schedules', JSON.stringify(schedules));
  };
  

  const activateAttractions = attractions?.filter(item => item.yymmdd === activateDate.yymmdd);

  return (
    <div>
      <TripDate dates={dates} actDate={activateDate} className="tripDateNav" />
      <TripDateDetail>
        <AttractionAddForm onAddAttraction={addAttraction} defaultDate={activateDate.date} />
        {activateAttractions?.map((item, index) => (
          <Attraction
            key={index}
            title={item.title}
            time={item.time}
            content={item.content}
            imgURL={item.selectedFileUrl}
            onRemove={() => removeAttraction(index)}
            className={index % 2 === 0 ? 'leftComponent' : 'rightComponent'}
          />
        ))}
      </TripDateDetail>
    </div>
  );
};

export default ScheduleDetail;