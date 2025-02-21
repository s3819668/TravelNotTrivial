import { useContext } from 'react';
import { ScheduleContext } from '../context/ScheduleContext';
import { SwitchRecommendContext } from '../context/SwitchRecommendContext';
import { LangContext } from '../context/GlobalLangContext';
import styled from 'styled-components';


const ScheduleContainer = styled.div`
    text-align: left;
    display: flex;
`;

const ScheduleItem = styled.div`
    writing-mode: vertical-rl;  // Text flows vertically right-to-left
    display: flex;
    justify-content: center;   // Centers content horizontally in flex
    align-items: center;       // Centers content vertically in flex
    margin-right: 10px;
    width: 3.5vw;
    height: ${({ isactive }) => (isactive ? '12vh' : '8vh')};
    background-color: rgb(140, 33, 33);
    position: relative;
    transition: height 0.25s, opacity 0.25s;
    font-size: clamp(12px, 1.5vw, 18px);
    overflow: hidden;          // Hides overflowing content
    text-overflow: ellipsis;   // Adds ellipsis (...) when text overflows
    white-space: nowrap;       // Prevents text wrapping
    &:hover {
        opacity: 0.7;
        height: 12vh;
    }
`
        
;const FakeScheduleItem = styled(ScheduleItem)`
    background-color: rgb(140, 103, 33);`;


const Schedule = () => {
    const { schedules, activateSchedule, setActivateSchedule } = useContext(ScheduleContext);
    const { setShowRecommend} = useContext(SwitchRecommendContext);
    const { activateLang } = useContext(LangContext)

    const newPlanText={
        "en-us":"New Schedule",
        "zh-tw":"新計畫"
    }
    return (
        <ScheduleContainer>
            {schedules.map((schedule, index) => (
                <ScheduleItem 
                    key={index} 
                    onClick={() => {
                        setActivateSchedule(schedule);
                        setShowRecommend(false);
                    }}
                    isactive={schedule === activateSchedule? 1 : undefined}
                >
                    {schedule}
                </ScheduleItem>
            ))}
                <FakeScheduleItem 
                    onClick={() => {
                        setActivateSchedule("New Schedule");
                        setShowRecommend(true);
                    }}
                    isactive={"New Schedule" === activateSchedule? 1 : undefined}
                >
                    {newPlanText[activateLang]}
                </FakeScheduleItem>
        </ScheduleContainer>
    );
};

export default Schedule;
