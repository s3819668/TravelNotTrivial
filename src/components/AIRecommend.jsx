import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getOpenAIResponse } from '../api/openAI';
import { LangContext } from '../context/GlobalLangContext';
import { ScheduleContext } from '../context/ScheduleContext';
import { SwitchRecommendContext } from '../context/SwitchRecommendContext';
import { TripDateContext } from '../context/TripDateContext';

// Styled Components
const Container = styled.div`
  width:50vw;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: #000000;
  padding: 20px;
`;

const TypewriterWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  // overflow: hidden;
`;

const TypewriterText = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin: 0;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 50px;
  padding: 15px;
  font-size: 1.1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1e1e1e;
  color: #ffffff;
  border: 1px solid #444;
  border-radius: 8px;
  outline: none;
  resize: none;
  overflow-y: auto;
  line-height: 1.5;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  height: auto;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 8px 20px;
  font-size: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ResponseText = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #cccccc;
  text-align: center;
  max-width: 600px;
`;

const AIrecommend = () => {
  const [displayText, setDisplayText] = useState('');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const {activateLang} = useContext(LangContext);
  const { savedData, setSavedData, activateScheduleName, setActivateScheduleName } = useContext(ScheduleContext);
  const { setShowRecommend} = useContext(SwitchRecommendContext);
  const { activateDate, setActivateDate } = useContext(TripDateContext);

  const recommendation = {
    "zh-tw": [
      "今天想去哪裡玩呢?",
      "要去北海道看雪景嗎?",
      "要去倫敦的大笨鐘拍照嗎?",
      "要去羅馬的競技場逛逛嗎?",
      "想去首爾吃韓式炸雞嗎?",
      "想去曼谷坐船逛夜市嗎?",
      "想去洛杉磯看好萊塢嗎?",
      "要去上海的外灘散步嗎?",
      "要去新加坡的魚尾獅公園玩嗎?",
      "要去悉尼看歌劇院嗎?",
      "想去香港吃港式燒臘嗎?",
      "想去北京爬長城嗎?",
      "想去沖繩潛水看海嗎?",
      "要去巴塞隆納看聖家堂嗎?",
      "要去埃及看金字塔嗎?",
      "想去東京迪士尼樂園玩嗎?",
      "想去夏威夷衝浪嗎?",
      "要去維也納聽音樂會嗎?",
      "要去冰島看極光嗎?",
      "想去廣州吃早茶嗎?"
    ],
    "en-us": [
      "Where do you want to go today?",
      "Want to go see the snow in Hokkaido?",
      "Want to take pictures at Big Ben in London?",
      "Want to visit the Colosseum in Rome?",
      "Want to eat Korean fried chicken in Seoul?",
      "Want to take a boat to the night market in Bangkok?",
      "Want to check out Hollywood in Los Angeles?",
      "Want to stroll along the Bund in Shanghai?",
      "Want to visit Merlion Park in Singapore?",
      "Want to see the Sydney Opera House?",
      "Want to eat Cantonese roast meat in Hong Kong?",
      "Want to climb the Great Wall in Beijing?",
      "Want to go diving in Okinawa?",
      "Want to see the Sagrada Familia in Barcelona?",
      "Want to visit the pyramids in Egypt?",
      "Want to go to Tokyo Disneyland?",
      "Want to surf in Hawaii?",
      "Want to attend a concert in Vienna?",
      "Want to see the Northern Lights in Iceland?",
      "Want to have dim sum in Guangzhou?"
    ]
  }
  const submitText = {
    "zh-tw": "送出",
    "en-us": "Submit"
  }
  const inputHintText = {
    "zh-tw": "輸入你的想法...",
    "en-us": "Enter your thoughts..."
  }
  const sorryForErrorText = {
    "zh-tw": "抱歉，出了點問題，請稍後再試！",
    "en-us": "Sorry, something went wrong. Please try again later!"
  }

  // 只在初次渲染時選擇一句話
  const [currentText] = useState(
    recommendation[activateLang][Math.floor(Math.random() * recommendation[activateLang].length)]
  );
  

  // 打字機效果
  useEffect(() => {
    let index = 0;
    let isAddingDots = false;
    let dotCount = 0;
    const fullTextWithSpace = currentText + ' ';

    const timer = setInterval(() => {
      if (!isAddingDots) {
        // 打字階段
        if (index < currentText.length) {
          setDisplayText(currentText.slice(0, index + 1));
          index++;
        } else {
          isAddingDots = true;
        }
      } else {
        // 添加點的階段
        if (dotCount < 3) {
          setDisplayText(fullTextWithSpace + '.'.repeat(dotCount + 1));
          dotCount++;
        } else {
          // 完成後停止，不重置
          clearInterval(timer);
        }
      }
    },100);

    return () => clearInterval(timer);
  }, [currentText]);

  // 處理送出
  const handleSubmit = async () => {
    if (input.trim()) {
      try {
        const result = await getOpenAIResponse(input,activateLang);
        console.log(result);

        // Retrieve schedules from localStorage
        const schedules = JSON.parse(localStorage.getItem('schedules')) || [];

        // Append the result to schedules
        if (result){
          if (result.ScheduleName && result.ScheduleDetail){
            schedules.push(result);
          }
        }
        // Update localStorage with the new schedules
        localStorage.setItem('schedules', JSON.stringify(schedules));

        // Update savedData context
        setSavedData(schedules);

        setActivateScheduleName(result.ScheduleName);
        const activateDates = JSON.parse(localStorage.getItem("activateDates")) || [];
        activateDates.push({"ScheduleName":result.ScheduleName,"date":{"yymmdd":result.ScheduleDetail[0].yymmdd}});
        localStorage.setItem("activateDates", JSON.stringify(activateDates));
        setActivateDate(result.ScheduleDetail[0].yymmdd);


        setShowRecommend(false);
        setInput('');
      } catch (error) {
        setResponse(sorryForErrorText[activateLang]);
      }
    }
  };

  return (
    <Container>
      <TypewriterWrapper>
        <TypewriterText>{displayText}</TypewriterText>
      </TypewriterWrapper>
      <InputWrapper>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputHintText[activateLang]}
          rows={1}
        />
        <SubmitButton onClick={handleSubmit}>{submitText[activateLang]}</SubmitButton>
      </InputWrapper>
    </Container>
  );
};

export default AIrecommend;