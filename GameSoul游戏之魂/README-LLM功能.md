# 🤖 LLM智能对话功能说明

## ✨ 功能概览

GameSoul 现已集成大语言模型（LLM），妲己拥有了真正的智能对话能力！

### 🎯 核心特性

| 功能 | 说明 |
|------|------|
| **多平台支持** | 支持6种主流LLM（OpenAI、智谱AI、Groq等） |
| **智能降级** | API失败自动切换到本地规则 |
| **对话记忆** | 记住最近3轮对话内容 |
| **角色扮演** | 妲己专属人设和语言风格 |
| **实时指示** | UI显示当前AI模式（本地/云端） |
| **零配置可用** | 默认使用本地规则，无需API即可运行 |

---

## 📁 新增文件

```
GameSoul游戏之魂/
├── src/
│   └── utils/
│       └── llmService.js          # LLM服务核心逻辑
├── .env.example                    # 环境变量模板
├── LLM集成指南.md                  # 完整详细文档
├── 配置LLM-快速指南.md             # 5分钟快速配置
└── README-LLM功能.md               # 本文件
```

---

## 🚀 快速开始

### 方案1：直接使用（无需配置）

项目默认使用本地规则，无需任何配置即可运行：

```bash
npm run dev
```

妲己会使用增强的本地规则进行回复。

### 方案2：启用真实AI（推荐）

#### 步骤1：复制环境变量模板
```bash
cp .env.example .env
```

#### 步骤2：获取API Key

**推荐：Groq（免费、快速）**
1. 访问：https://console.groq.com
2. 注册并创建API Key
3. 复制密钥（格式：`gsk_xxx...`）

#### 步骤3：配置 .env
```env
VITE_LLM_PROVIDER=groq
VITE_GROQ_API_KEY=gsk_你的密钥
VITE_GROQ_MODEL=llama-3.1-70b-versatile
```

#### 步骤4：重启项目
```bash
npm run dev
```

---

## 🎮 使用体验

### 本地规则模式（默认）

```
你：今天五杀了！
妲己：哇！主人太厉害了！妲己都看呆了~ ⭐💕
```

- 回复来自预设模板
- 响应速度极快
- 完全离线可用
- 无API成本

### LLM智能模式

```
你：今天五杀了！
妲己：哇塞！主人好厉害呀！五杀诶！💕 是用什么英雄做到的呀？
      妲己都想看主人的精彩操作了~ ⭐
```

- 动态生成回复
- 理解上下文
- 主动提问引导
- 对话更自然

**识别方法：** 查看右上角是否显示 "⚡ AI驱动" 标识

---

## 🌟 支持的LLM平台

### 1. Groq（推荐）
- ✅ 完全免费
- ⚡ 速度极快（<1秒）
- 🌍 全球可访问
- 📝 配置简单

### 2. 智谱AI（国内推荐）
- ✅ 免费额度充足
- 🇨🇳 国内访问快
- 💬 中文理解优秀
- 🎁 新用户赠送100万tokens

### 3. 通义千问
- ✅ 阿里云服务
- 🇨🇳 国内稳定
- 💰 有免费额度
- 🔐 企业级安全

### 4. Deepseek
- 💰 性价比高
- 🎯 效果优秀
- 🇨🇳 国内可访问
- 💵 按量付费

### 5. OpenAI
- ⭐ 效果最佳
- 🌍 需要科学上网
- 💰 按量付费
- 💳 需海外信用卡

### 6. 本地规则（默认）
- ✅ 完全免费
- ⚡ 响应即时
- 📵 离线可用
- 🔒 数据隐私

---

## 🎭 妲己的智能特性

### 角色人设
- 九尾狐精灵，俏皮可爱
- 称呼玩家为"主人"
- 善解人意，温柔体贴
- 大量使用表情符号 💕✨🦊

### 对话能力
- ✅ 理解游戏术语（五杀、超神、MVP等）
- ✅ 识别情绪（开心、失望、愤怒等）
- ✅ 记住对话历史（3轮上下文）
- ✅ 主动引导话题深入
- ✅ 根据情况安慰或庆祝

### 回复规则
- 每次回复50字以内
- 必含表情符号
- 保持人设不跳戏
- 适时提问互动

---

## 📊 技术实现

### 架构设计

```
用户输入
    ↓
SoulLink组件
    ↓
llmService.js（智能路由）
    ↓
┌─────────┬─────────┬─────────┐
│  Groq   │ 智谱AI  │本地规则 │
└─────────┴─────────┴─────────┘
    ↓
智能回复
    ↓
UI展示
```

### 核心代码

**LLM调用：**
```javascript
import { getLLMResponse } from '../utils/llmService'

const response = await getLLMResponse(
  userMessage,      // 用户当前输入
  historyMessages   // 历史对话记录
)
```

**智能降级：**
```javascript
try {
  // 尝试调用LLM API
  response = await callLLMAPI()
} catch (error) {
  // 失败时自动降级到本地规则
  response = localSimulation()
}
```

---

## 🔧 高级配置

### 调整AI参数

编辑 `src/utils/llmService.js`：

```javascript
{
  temperature: 0.9,      // 创造性（0-2）
  max_tokens: 150,       // 回复长度
  top_p: 0.95,          // 采样范围
  frequency_penalty: 0.5,// 避免重复
  presence_penalty: 0.3  // 话题多样性
}
```

### 修改人设

编辑 `DAJI_SYSTEM_PROMPT` 常量：

```javascript
const DAJI_SYSTEM_PROMPT = `
你是《王者荣耀》中的妲己...
// 在此修改角色设定
`
```

### 调整上下文

在 `SoulLink.jsx` 中：

```javascript
const conversationHistory = messages.slice(-6)
// -6 = 最近3轮对话（每轮2条消息）
// 可根据需要调整
```

---

## 📱 部署指南

### Vercel部署

1. 在Vercel项目设置中添加环境变量：
   ```
   VITE_LLM_PROVIDER = groq
   VITE_GROQ_API_KEY = gsk_你的密钥
   VITE_GROQ_MODEL = llama-3.1-70b-versatile
   ```

2. 重新部署项目

### Netlify部署

1. Site settings → Environment variables
2. 添加相同的环境变量
3. Trigger deploy

---

## 🐛 故障排查

### 问题：未显示"AI驱动"标识

**检查清单：**
- [ ] .env文件是否存在
- [ ] VITE_LLM_PROVIDER是否设置
- [ ] API Key是否正确填写
- [ ] 是否重启了开发服务器

**解决：**
```bash
# 停止服务器（Ctrl+C）
npm run dev
```

### 问题：API调用失败

**可能原因：**
- API Key无效
- 网络问题
- 配额用尽
- 平台服务异常

**解决：**
1. 查看浏览器控制台错误
2. 验证API Key
3. 检查平台状态
4. 系统会自动降级到本地规则

### 问题：回复不符合预期

**优化方向：**
- 调整 temperature 参数
- 强化系统提示词
- 增加示例对话
- 调整上下文长度

---

## 📈 性能对比

| 指标 | 本地规则 | Groq | 智谱AI | OpenAI |
|------|----------|------|--------|--------|
| 响应速度 | < 100ms | 1-2s | 2-3s | 2-4s |
| 智能程度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 成本 | 免费 | 免费 | 免费额度 | 按量付费 |
| 网络要求 | 无 | 需要 | 需要 | 需要 |
| 适用场景 | 演示/离线 | 生产/演示 | 国内用户 | 追求极致 |

---

## 🎯 使用建议

### 开发阶段
- 使用**本地规则**快速迭代
- 或使用**Groq**测试AI效果

### 演示阶段
- 使用**Groq**或**智谱AI**
- 展示真实AI对话能力

### 生产阶段
- 根据用户量选择平台
- 考虑成本和效果平衡
- 建议实现多平台负载均衡

---

## 🔗 相关文档

- **快速配置：** `配置LLM-快速指南.md`（5分钟上手）
- **详细文档：** `LLM集成指南.md`（完整说明）
- **API示例：** `.env.example`（配置模板）

---

## 📞 技术支持

**文档位置：**
```
/Users/allenzqwei/Desktop/playtest/GameSoul游戏之魂/
```

**相关文件：**
- `src/utils/llmService.js` - LLM服务实现
- `src/components/SoulLink.jsx` - 对话界面
- `.env.example` - 配置模板

**调试信息：**
- 查看浏览器控制台
- 查看终端输出
- 检查网络请求

---

**功能版本：** v3.0 LLM Enhanced  
**更新时间：** 2025-11-20  
**开发团队：** GameSoul Team

🎉 **享受真正的AI智能对话体验！**
