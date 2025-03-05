import Schedule from './components/Schedule';
import { ScheduleProvider } from './context/ScheduleContext';
import { TripDateProvider } from './context/TripDateContext';
import { SwitchProvider } from './context/SwitchRecommendContext';
import { LangProvider} from './context/GlobalLangContext';
import { AttractionProvider } from './context/AttractionContext';
import ScheduleView from './components/ScheduleView';

function App() {


  return (
    <LangProvider>
      <ScheduleProvider>
        <TripDateProvider>
          <SwitchProvider>
            <AttractionProvider>
            <Schedule />
            <ScheduleView />
            </AttractionProvider>
          </SwitchProvider>
        </TripDateProvider>
      </ScheduleProvider>
    </LangProvider>
  );
}

export default App;