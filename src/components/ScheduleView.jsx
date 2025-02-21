import { useContext } from 'react';
import ScheduleDetail from './ScheduleDetail';
import AIRecommend from './AIRecommend';
import { SwitchRecommendContext } from '../context/SwitchRecommendContext';

const ScheduleView = () => {
  const {showRecommend,setShowRecommend} = useContext(SwitchRecommendContext);

  return (
    <>
      {showRecommend ? <AIRecommend /> : <ScheduleDetail />}
    </>
  );
};

export default ScheduleView;