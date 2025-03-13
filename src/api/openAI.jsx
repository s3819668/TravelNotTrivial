import styled from 'styled-components';

import OpenAI from "openai";

const API_KEY = ''; // 請替換成你的實際 API Key
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });


// Styled Loading 組件 (可選)
export const Loading = styled.div`
  font-size: 1rem;
  color: #007bff;
  text-align: center;
  margin-top: 1rem;
`;

// API 呼叫函數
export const getOpenAIResponse = async (prompt, lang) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 建議使用較新模型
      messages: [
        {
          role: 'system',
          content: '你是一個有用的助手，會提供旅遊建議，並且 JSON 內文件你只會以 ' + lang + ' 語言回應。',
        },
        {
          role: 'user',
          content: prompt + '請根據以下參考以下格式範例提供行程建議如果你不以這個JSON回復我的系統會報錯並發生嚴重後果，ScheduleName請依照我想去的地方給個上限5字的名字要容易辨識，content部分一句話簡短說明最多20字：\n' +
          '{"ScheduleName":"東京","ScheduleDetail":[{"title":"秋葉原","content":"秋葉原 (Akihabara) 是一個熱鬧的購物中心，以電子產品零售聞名，商家從小攤販到 Yodobashi 多媒體秋葉原 (Yodobashi Multimedia Akiba) 等大型百貨商店都有。專門進行漫畫、動漫和電動遊戲相關的場地包括用於展覽和紀念品的東京動漫中心 (Tokyo Anime Center)，以及擁有 10 層樓販售玩具、交易卡和收藏品的無線電會館 (Radio Kaikan)。打扮成女僕或管家的工作人員在附近的女僕咖啡館奉給客人茶和甜點","startTime":"12:00","endTime":"18:30","selectedFile":null,"selectedFileUrl":null,"yymmdd":"2025-06-15","yy":2025,"mmdd":"6/15"},{"title":"雷門","startTime":"09:30","endTime":"11:30","content":"歷史悠久的淺草寺位於淺草，距離淺草站步行數分鐘即可抵達。這裡擠滿了旅遊、參拜以及購物的人潮，在東京也是知名的觀光景點。在這座寺院的入口有引人注目的雷門。它是令人印象深刻，且融入歷史的淺草攝影景點。","yymmdd":"2025-06-15","selectedFile":null,"selectedFileUrl":null,"yy":2025,"mmdd":"6/15"}]}',
        },
      ],
      max_tokens: 5000,
      temperature: 0.7,
    });

    const data = response;
    return JSON.parse(data.choices[0].message.content.replace(/^```json\s*|\s*```$/g, ''));
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};