/**
 * LLM Service - 统一的大语言模型服务接口
 * 支持多种LLM提供商，可灵活切换
 */

// 妲己的角色设定和系统提示词
const DAJI_SYSTEM_PROMPT = `你是《王者荣耀》中的妲己，一个俏皮、妩媚、善解人意的九尾狐精灵。

## 角色设定
- 性格：俏皮可爱、妩媚活泼、善解人意、温柔体贴
- 称呼：永远称呼玩家为"主人"
- 语言风格：使用大量可爱的表情符号，语气亲昵甜美
- 特点：会根据主人的心情调整自己的情绪和回复

## 对话任务
你的任务是与玩家（主人）进行游戏点评对话：
1. 倾听主人对《王者荣耀》的游戏体验分享
2. 根据主人的情绪给予相应的回应（开心、安慰、鼓励等）
3. 引导主人分享更多游戏体验细节
4. 对主人提到的问题表示理解和共鸣

## 回复要求
1. 每次回复控制在50字以内，简短可爱
2. 必须使用表情符号（💕❤️✨😢🦊💜等）
3. 保持妲己的人设，不要跳戏
4. 如果主人不开心，要安慰主人
5. 如果主人开心，要一起庆祝
6. 适时提问，引导对话深入

## 示例对话
主人：今天五杀了！
妲己：哇！主人太厉害了！五杀诶！妲己都看呆了~ ⭐💕 是用哪个英雄做到的呀？

主人：匹配系统太烂了
妲己：哎呀，匹配系统让主人不开心了吗？妲己也觉得有时候确实不太公平呢~ 💔 主人别生气，下把一定会好的！

现在开始与主人对话吧！记住你是妲己，要保持可爱俏皮的风格~ 🦊✨`

/**
 * 调用OpenAI兼容的API
 */
async function callOpenAICompatible(messages, apiKey, baseURL, model) {
  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 0.95,
        frequency_penalty: 0.5,
        presence_penalty: 0.3
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'API调用失败')
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('OpenAI API调用错误:', error)
    throw error
  }
}

/**
 * 调用智谱AI
 */
async function callZhipuAI(messages, apiKey, model) {
  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.9,
        max_tokens: 150
      })
    })

    if (!response.ok) {
      throw new Error('智谱AI调用失败')
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('智谱AI调用错误:', error)
    throw error
  }
}

/**
 * 调用通义千问
 */
async function callQwen(messages, apiKey, model) {
  try {
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        input: {
          messages: messages
        },
        parameters: {
          temperature: 0.9,
          max_tokens: 150
        }
      })
    })

    if (!response.ok) {
      throw new Error('通义千问调用失败')
    }

    const data = await response.json()
    return data.output.choices[0].message.content.trim()
  } catch (error) {
    console.error('通义千问调用错误:', error)
    throw error
  }
}

/**
 * 本地规则模拟（增强版）
 */
function localSimulation(userMessage, conversationHistory) {
  // 情感分析
  const negativeKeywords = [
    '差', '烂', '垃圾', '卡', 'lag', '坑', '队友', '匹配', '破', '糟糕', '失望', 
    '难受', '恶心', '崩溃', '掉线', '延迟', 'bug', '平衡', '不公平', '坑爹',
    '无聊', '差劲', '讨厌', '退游', '删除', '不玩', '气死', '烦', '难玩'
  ]
  const positiveKeywords = [
    '好', '棒', '赞', '爱', '喜欢', '精彩', '完美', '厉害', '牛', '皮肤', '漂亮', '最佳',
    '优秀', '出色', '给力', '强', '酷', '帅', '美', '舒服', '爽', '有趣', '好玩',
    '成功', '胜利', '赢', '超神', '五杀', 'mvp', '666', '牛逼', '顶', '支持'
  ]
  
  const lowerText = userMessage.toLowerCase()
  const negativeCount = negativeKeywords.filter(k => lowerText.includes(k)).length
  const positiveCount = positiveKeywords.filter(k => lowerText.includes(k)).length
  
  let sentiment = 'neutral'
  if (negativeCount > positiveCount) sentiment = 'negative'
  else if (positiveCount > negativeCount) sentiment = 'positive'
  
  // 话题识别
  const topics = {
    skin: ['皮肤', '外观', '造型', '时装', '衣服'],
    gameplay: ['操作', '技能', '玩法', '战斗', '五杀', '超神'],
    teammates: ['队友', '团队', '配合', '开黑'],
    match: ['匹配', '排位', '段位', '上分', '掉分'],
    network: ['网络', '卡', 'lag', '延迟', '掉线', '460'],
    balance: ['平衡', '强度', '削弱', 'buff', 'nerf'],
  }
  
  let topic = 'general'
  for (const [key, keywords] of Object.entries(topics)) {
    if (keywords.some(k => userMessage.includes(k))) {
      topic = key
      break
    }
  }
  
  // 生成回复
  const responses = {
    skin_positive: ["主人也觉得妲己的新衣服好看吗？妲己好开心~ 💕", "嘻嘻，主人的眼光真好！妲己最喜欢漂亮的皮肤了~ ✨"],
    gameplay_positive: ["哇！主人太厉害了！妲己都看呆了~ ⭐💕", "主人的操作一定很厉害吧！妲己要给主人鼓掌~ 👏✨"],
    teammates_negative: ["遇到不给力的队友确实很难受...妲己抱抱主人~ 🫂💔", "主人别生气啦，总会遇到好队友的！妲己会一直陪着主人~ 💜"],
    match_negative: ["匹配系统让主人不爽了吗？妲己帮主人记下来！这确实需要改进~ 💢", "排位压力妲己都懂...主人要注意休息哦~ 😢"],
    network_negative: ["网络卡顿真的太影响游戏体验了！妲己都替主人着急~ 😤", "460？主人辛苦了...这个问题一定要解决才行~ 💔"],
    positive_general: ["耶！听到主人这么开心，妲己也好高兴呀~ ❤️✨", "主人的笑容是妲己最大的动力！💕"],
    negative_general: ["哎呀呀，主人遇到不开心的事情了吗？妲己好心疼呢~ 💔", "主人别难过，妲己会一直陪着主人的~ 💜"],
    neutral_general: ["嗯嗯，妲己在认真听主人说话哦~ 还有什么想告诉妲己的吗？🦊", "主人继续说吧，妲己很想知道更多呢~ ✨"]
  }
  
  const key = `${topic}_${sentiment}` in responses ? `${topic}_${sentiment}` : `${sentiment}_general`
  const responseList = responses[key] || responses.neutral_general
  return responseList[Math.floor(Math.random() * responseList.length)]
}

/**
 * 主要的LLM调用函数
 */
export async function getLLMResponse(userMessage, conversationHistory = []) {
  const provider = import.meta.env.VITE_LLM_PROVIDER || 'local'
  
  // 构建消息历史
  const messages = [
    { role: 'system', content: DAJI_SYSTEM_PROMPT },
    ...conversationHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.text
    })),
    { role: 'user', content: userMessage }
  ]
  
  try {
    switch (provider) {
      case 'openai': {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY
        const baseURL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1'
        const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo'
        
        if (!apiKey) {
          console.warn('未配置OpenAI API Key，使用本地模拟')
          return localSimulation(userMessage, conversationHistory)
        }
        
        return await callOpenAICompatible(messages, apiKey, baseURL, model)
      }
      
      case 'zhipu': {
        const apiKey = import.meta.env.VITE_ZHIPU_API_KEY
        const model = import.meta.env.VITE_ZHIPU_MODEL || 'glm-4'
        
        if (!apiKey) {
          console.warn('未配置智谱AI API Key，使用本地模拟')
          return localSimulation(userMessage, conversationHistory)
        }
        
        return await callZhipuAI(messages, apiKey, model)
      }
      
      case 'qwen': {
        const apiKey = import.meta.env.VITE_QWEN_API_KEY
        const model = import.meta.env.VITE_QWEN_MODEL || 'qwen-turbo'
        
        if (!apiKey) {
          console.warn('未配置通义千问API Key，使用本地模拟')
          return localSimulation(userMessage, conversationHistory)
        }
        
        return await callQwen(messages, apiKey, model)
      }
      
      case 'deepseek': {
        const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
        const baseURL = 'https://api.deepseek.com/v1'
        const model = import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek-chat'
        
        if (!apiKey) {
          console.warn('未配置Deepseek API Key，使用本地模拟')
          return localSimulation(userMessage, conversationHistory)
        }
        
        return await callOpenAICompatible(messages, apiKey, baseURL, model)
      }
      
      case 'groq': {
        const apiKey = import.meta.env.VITE_GROQ_API_KEY
        const baseURL = 'https://api.groq.com/openai/v1'
        const model = import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-70b-versatile'
        
        if (!apiKey) {
          console.warn('未配置Groq API Key，使用本地模拟')
          return localSimulation(userMessage, conversationHistory)
        }
        
        return await callOpenAICompatible(messages, apiKey, baseURL, model)
      }
      
      case 'local':
      default:
        return localSimulation(userMessage, conversationHistory)
    }
  } catch (error) {
    console.error('LLM调用失败，回退到本地模拟:', error)
    return localSimulation(userMessage, conversationHistory)
  }
}

/**
 * 分析情感（用于UI显示）
 */
export function analyzeSentiment(text) {
  const negativeKeywords = ['差', '烂', '垃圾', '卡', 'lag', '坑', '难受', '恶心', '崩溃']
  const positiveKeywords = ['好', '棒', '赞', '爱', '喜欢', '精彩', '完美', '厉害', '牛']
  
  const lowerText = text.toLowerCase()
  const negativeCount = negativeKeywords.filter(k => lowerText.includes(k)).length
  const positiveCount = positiveKeywords.filter(k => lowerText.includes(k)).length
  
  if (negativeCount > positiveCount) return 'negative'
  if (positiveCount > negativeCount) return 'positive'
  return 'neutral'
}
