import { useState, useContext } from 'react';
import styled from 'styled-components';
import { ScheduleContext } from '../context/ScheduleContext';
import { TripDateContext } from '../context/TripDateContext';

const TripDatesNav = styled.div`
  width: 50vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #B99362;
`;

const NavBtn = styled.div`
  font-size: 4em;
  width: 10%;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  visibility: ${props => (props.hidden ? "hidden" : "visible")};
`;


const TripDates = styled.div`
  overflow: hidden;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TripDateItem = styled.div`
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 10%;
  text-align: center;
  line-height: 2em;
  cursor: pointer;
  &.activateDate {
    background-color: #00000033;
    border-radius: 5%;
  }
`;

const YY = styled.div`
  font-size: 0.8em;
`;

const MMDD = styled.div`
  font-size: 2em;
`;

const Weekday = styled.div`
  font-size: 1.3em;
`;

const TripDate = ({ dates }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {activateSchedule, setActivateSchedule} = useContext(ScheduleContext);
  const { activateDate, setActivateDate } = useContext(TripDateContext);

  const handlePrev = () => {
    setCurrentIndex(Math.max(currentIndex - 7, 0));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + 7, dates.length - 1));
  };

  const handleSelectDate = (d) => {
    const activateDates = JSON.parse(localStorage.getItem("activateDates")) || [];
    const activateDate = activateDates.find(schedule => schedule.ScheduleName === activateSchedule);
    if (activateDate) {
      activateDate.date = d
    }else{
      activateDates.push({"ScheduleName":activateSchedule,"date":d})
    }
    localStorage.setItem("activateDates", JSON.stringify(activateDates));
    setActivateDate(d);
  };

  return (
    <TripDatesNav>
      <NavBtn hidden={currentIndex === 0} onClick={handlePrev}>&lt;</NavBtn>
      <TripDates>
        {dates.slice(currentIndex, currentIndex + 7).map((date, index) => (
          <TripDateItem
            key={index}
            className={date.yymmdd === activateDate.yymmdd ? 'activateDate' : ''}
            onClick={() =>handleSelectDate(date)}
          >
            <YY>{new Date(date.yymmdd).getFullYear()}</YY>
            <MMDD>{new Date(date.yymmdd).getMonth() + 1 + "/" + new Date(date.yymmdd).getDate()}</MMDD>
            <Weekday>{date.weekday}</Weekday>
          </TripDateItem>
        ))}
      </TripDates>
      <NavBtn hidden={currentIndex + 7 >= dates.length} onClick={handleNext}>&gt;</NavBtn>
    </TripDatesNav>
  );
};

export default TripDate;