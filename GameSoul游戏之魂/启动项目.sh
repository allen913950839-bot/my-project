#!/bin/bash

echo "🎮 GameSoul - 游戏之魂 启动脚本"
echo "================================"
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null
then
    echo "❌ Node.js 未安装"
    echo ""
    echo "请先安装 Node.js："
    echo "1. 访问 https://nodejs.org/ 下载安装"
    echo "2. 或使用 Homebrew: brew install node"
    echo ""
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    echo "这可能需要几分钟时间，请耐心等待..."
    echo ""
    npm install
    echo ""
    echo "✅ 依赖安装完成！"
    echo ""
fi

echo "🚀 启动开发服务器..."
echo "浏览器将自动打开 http://localhost:5173"
echo ""
echo "💡 提示："
echo "  - 按 Ctrl+C 停止服务器"
echo "  - 修改代码会自动刷新页面"
echo ""
echo "================================"
echo ""

npm run dev
