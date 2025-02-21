import Schedule from './components/Schedule';
import { ScheduleProvider } from './context/ScheduleContext';
import { TripDateProvider } from './context/TripDateContext';
import { SwitchProvider } from './context/SwitchRecommendContext';
import {LangProvider} from './context/GlobalLangContext';
import ScheduleView from './components/ScheduleView';

function App() {


  return (
    <LangProvider>
      <ScheduleProvider>
        <TripDateProvider>
          <SwitchProvider>
            <Schedule />
            <ScheduleView />
          </SwitchProvider>
        </TripDateProvider>
      </ScheduleProvider>
    </LangProvider>
  );
}

export default App;