import styled from 'styled-components';

// 這裡假設使用的是 OpenAI 的 API，你需要根據實際情況調整
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'; // OpenAI API 端點
const API_KEY = 'your-api-key-here'; // 請替換成你的實際 API Key

// Styled Loading 組件 (可選)
export const Loading = styled.div`
  font-size: 1rem;
  color: #007bff;
  text-align: center;
  margin-top: 1rem;
`;

// API 呼叫函數
export const getOpenAIResponse = async (prompt,lang) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '你是一個有用的助手，會提供旅遊建議，並且JSON內文件你只會以'+lang+'語言回應。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};