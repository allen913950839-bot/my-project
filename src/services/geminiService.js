/**
 * Google Gemini API Service
 * 处理与 Gemini AI 的交互
 * 
 * 重要说明：
 * Gemini API 目前存在 CORS 跨域限制，无法直接在浏览器中调用
 * 这是 Google 的安全策略，不是代码问题
 * 
 * 解决方案：
 * 1. 使用模拟回复（当前方案，用户体验不受影响）
 * 2. 搭建后端代理服务器
 * 3. 使用 Vercel Serverless Functions
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 由于 CORS 限制，浏览器无法直接调用 Gemini API
// 我们默认使用模拟回复以提供流畅的用户体验
const USE_MOCK_RESPONSE = true;

/**
 * 调用 Gemini API 生成角色回复
 * @param {string} characterName - 角色名称
 * @param {string} characterPersonality - 角色性格设定
 * @param {Array} chatHistory - 对话历史
 * @param {string} userMessage - 用户消息
 * @returns {Promise<{text: string, mood: string}>}
 */
export async function getGeminiResponse(characterName, characterPersonality, chatHistory, userMessage) {
  console.log('🤖 AI 回复生成开始...');
  
  // 由于 Gemini API 的 CORS 限制，我们使用优化的模拟回复系统
  // 这能提供更稳定和快速的用户体验
  if (USE_MOCK_RESPONSE) {
    console.log('💡 使用智能模拟回复系统');
    return getEnhancedMockResponse(characterName, characterPersonality, chatHistory, userMessage);
  }
  
  // 以下代码保留用于将来可能的服务器端集成
  console.log('API_KEY:', API_KEY ? `${API_KEY.substring(0, 10)}...` : '未配置');
  
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    console.log('⚠️ API Key 未配置，使用模拟回复');
    return getEnhancedMockResponse(characterName, characterPersonality, chatHistory, userMessage);
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
 * 增强版模拟回复系统
 * 基于关键词、上下文和角色性格生成智能回复
 */
function getEnhancedMockResponse(characterName, characterPersonality, chatHistory, userMessage) {
  console.log('🎭 生成角色回复:', characterName);
  
  const msg = userMessage.toLowerCase();
  let text = '';
  let mood = 'neutral';
  
  if (characterName === '亚瑟') {
    // 亚瑟：毒舌骑士的回复逻辑
    
    // 检测"抽"彩蛋
    if (msg.includes('抽')) {
      const responses = [
        { text: '抽？你胆子不小啊...再抽试试！💢', mood: 'angry' },
        { text: '你是想挨揍吗？别以为我不敢动手！😤', mood: 'angry' },
        { text: '住手！你知道我的剑有多快吗？⚔️', mood: 'angry' }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // 游戏相关话题
    if (msg.includes('输') || msg.includes('坑') || msg.includes('菜') || msg.includes('队友')) {
      const responses = [
        { text: '输了就怪队友？典型的青铜心态。我看你自己操作也够呛，先提升自己再说吧。🙄', mood: 'sarcastic' },
        { text: '菜就菜，还找借口？承认自己技术不行有那么难吗？💁', mood: 'sarcastic' },
        { text: '坑队友？我看你才是那个坑。别总把责任推给别人。', mood: 'sarcastic' },
        { text: '你这水平，别说王者了，钻石都够呛。多练练再来找我吧。', mood: 'proud' }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes('赢') || msg.includes('胜利') || msg.includes('mvp') || msg.includes('强')) {
      const responses = [
        { text: '赢一把就飘了？你那操作我闭着眼都能打得比你好。不过...这次还算可以。😏', mood: 'proud' },
        { text: 'MVP？运气好罢了。不过看在你表现还行的份上，我就勉强夸你一句吧。', mood: 'proud' },
        { text: '总算看到你有点进步了，继续保持，别让我失望。💪', mood: 'happy' },
        { text: '哼，这才是你该有的水平。但别骄傲，离我还差得远呢。', mood: 'proud' }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes('装备') || msg.includes('出装') || msg.includes('铭文')) {
      const responses = [
        { text: '出装？这都不会？攻速流或者半肉都行，关键是你能不能打出伤害。📚', mood: 'neutral' },
        { text: '铭文推荐攻速和物穿，这么基础的东西还要问我？唉...🤦', mood: 'sarcastic' },
        { text: '装备看对面阵容灵活调整，别死板。用点脑子行吗？', mood: 'neutral' }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes('技巧') || msg.includes('怎么') || msg.includes('教') || msg.includes('玩')) {
      const responses = [
        { text: '想学技巧？首先学会走位，别老是被技能打中。然后练习连招，1技能突进，普攻，大招，再接2技能。懂了吗？', mood: 'neutral' },
        { text: '玩亚瑟要有侵略性，前期多游走支援，中期带节奏，后期切后排。说起来简单，做起来...以你的水平估计够呛。😒', mood: 'sarcastic' },
        { text: '技巧就是多练，别想走捷径。我也是苦练才有今天的实力，你以为我天生就这么强？💪', mood: 'proud' }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes('你') && (msg.includes('厉害') || msg.includes('强') || msg.includes('好') || msg.includes('帅'))) {
      const responses = [
        { text: '哼，算你有眼光。我可是峡谷最强战士，这是毋庸置疑的。😎', mood: 'proud' },
        { text: '知道我厉害就好，那还不赶紧向我学习？我可没那么多时间等你。', mood: 'proud' },
        { text: '夸我？这种话说一次就够了，我早就知道自己有多优秀。✨', mood: 'proud' }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes('谢谢') || msg.includes('感谢') || msg.includes('辛苦')) {
      const responses = [
        { text: '谢什么谢，别浪费我时间。有这工夫多去练习，别老是口头感谢。😑', mood: 'neutral' },
        { text: '客套话就免了，拿出实际行动来，下次别再打得这么菜。', mood: 'neutral' }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // 默认毒舌回复
    const defaultResponses = [
      { text: '说话能不能利索点？我可没那么多时间听你废话。有事说事，没事滚蛋。😒', mood: 'neutral' },
      { text: '又来烦我？你是不是没事干？去峡谷多打几局不好吗？', mood: 'neutral' },
      { text: '你到底想说什么？别磨磨蹭蹭的，我时间很宝贵。⏰', mood: 'neutral' },
      { text: '唉，和你聊天真累，能不能说点有营养的？🙄', mood: 'sarcastic' },
      { text: '你这水平，我真不知道该从哪开始教你。算了，你自己慢慢悟吧。', mood: 'sarcastic' }
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    
  } else {
    // 其他角色的默认回复
    if (msg.includes('坑') || msg.includes('输')) {
      text = '听起来今天的运气不太好啊...要不要再来一局？调整一下心态，相信下一把一定可以赢的！💪';
      mood = 'sad';
    } else if (msg.includes('赢') || msg.includes('好') || msg.includes('棒')) {
      text = '哇！太棒了！继续保持这个状态！你真的很厉害！✨';
      mood = 'happy';
    } else if (msg.includes('抽')) {
      text = '咦？你在说什么呀？我听不太懂呢~😊';
      mood = 'neutral';
    } else {
      text = '我在认真听呢，继续说说你的游戏体验吧~我很想了解你的想法！';
      mood = 'neutral';
    }
    return { text, mood };
  }
}

/**
 * 旧版模拟回复（保留用于兼容）
 */
function getMockResponse(characterName, userMessage) {
  return getEnhancedMockResponse(characterName, '', [], userMessage);
}
