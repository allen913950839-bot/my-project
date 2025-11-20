/**
 * Google Gemini API Service
 * 处理与 Gemini AI 的交互
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// 使用稳定的 v1beta API 和 gemini-pro 模型
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * 调用 Gemini API 生成角色回复
 * @param {string} characterName - 角色名称
 * @param {string} characterPersonality - 角色性格设定
 * @param {Array} chatHistory - 对话历史
 * @param {string} userMessage - 用户消息
 * @returns {Promise<{text: string, mood: string}>}
 */
export async function getGeminiResponse(characterName, characterPersonality, chatHistory, userMessage) {
  console.log('🤖 Gemini API 调用开始...');
  console.log('API_KEY:', API_KEY ? `${API_KEY.substring(0, 10)}...` : '未配置');
  
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    console.log('⚠️ API Key 未配置，使用模拟回复');
    return getMockResponse(characterName, userMessage);
  }

  try {
    // 构建对话上下文
    const conversationContext = chatHistory
      .filter(msg => msg.sender === 'user')
      .map(msg => `用户: ${msg.text}`)
      .join('\n');

    // 构建系统提示词
    const systemPrompt = `你是${characterName}，${characterPersonality}

重要规则:
1. 严格保持${characterName}的人设和说话风格
2. 回复要简洁有趣，不超过80字
3. 可以适当使用emoji表情
4. 根据用户的情绪做出相应反应
5. 如果用户提到游戏体验，要记录并评价

之前的对话:
${conversationContext}

现在用户说: ${userMessage}

请以${characterName}的口吻回复(只返回回复内容，不要加"${characterName}:"等前缀):`;

    console.log('📤 发送请求到 Gemini API...');
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Gemini API 错误:', response.status, errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('📥 收到 Gemini 响应:', data);
    
    const aiText = data.candidates[0]?.content?.parts[0]?.text || '我现在有点累了，待会再聊...';
    console.log('✅ AI 回复:', aiText);

    // 分析情绪
    const mood = analyzeMood(userMessage, aiText);

    return {
      text: aiText,
      mood: mood
    };

  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    console.log('⚠️ 使用模拟回复作为后备');
    // 出错时返回模拟回复
    return getMockResponse(characterName, userMessage);
  }
}

/**
 * 分析对话情绪
 */
function analyzeMood(userMessage, aiResponse) {
  const happyKeywords = ['好', '棒', '赢', '爽', '厉害', '强', '牛'];
  const sadKeywords = ['坑', '垃圾', '输', '烂', '差', '菜', '难'];
  const angryKeywords = ['气', '怒', '骂', '烦', '讨厌'];
  const excitedKeywords = ['哈哈', '笑', '有趣', '好玩'];

  const text = userMessage + aiResponse;

  if (sadKeywords.some(kw => text.includes(kw))) return 'sad';
  if (angryKeywords.some(kw => text.includes(kw))) return 'angry';
  if (excitedKeywords.some(kw => text.includes(kw))) return 'excited';
  if (happyKeywords.some(kw => text.includes(kw))) return 'happy';

  return 'neutral';
}

/**
 * 模拟回复（当 API 不可用时）
 */
function getMockResponse(characterName, userMessage) {
  let text = '';
  let mood = 'neutral';

  if (characterName === '亚瑟') {
    // 亚瑟的毒舌回复
    if (userMessage.includes('坑') || userMessage.includes('输') || userMessage.includes('菜')) {
      text = '输了就怪队友？呵，典型的青铜心态。我看你操作也不咋地，别总找借口了。';
      mood = 'sarcastic';
    } else if (userMessage.includes('赢') || userMessage.includes('好') || userMessage.includes('棒')) {
      text = '赢一把就飘了？你那操作我闭着眼都能打得比你好。不过...这次还算可以。';
      mood = 'proud';
    } else if (userMessage.includes('抽')) {
      text = '抽？抽什么抽！你以为你是谁啊...等等，你再抽试试！💢';
      mood = 'angry';
    } else {
      text = '说话能不能利索点？我可没那么多时间听你废话。有事说事，没事滚蛋。';
      mood = 'neutral';
    }
  } else {
    // 其他角色的默认回复
    if (userMessage.includes('坑') || userMessage.includes('输')) {
      text = '听起来今天的运气不太好啊...要不要再来一局？';
      mood = 'sad';
    } else if (userMessage.includes('赢') || userMessage.includes('好')) {
      text = '哇！太棒了！继续保持这个状态！';
      mood = 'happy';
    } else {
      text = '我在认真听呢，继续说说你的游戏体验吧~';
      mood = 'neutral';
    }
  }

  return { text, mood };
}
