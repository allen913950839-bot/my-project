#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GameVerse 优化脚本
1. 修改亚瑟的角色对话
2. 添加真实视频/语音素材
3. 添加关键词彩蛋系统
"""

import re

# 读取HTML文件
with open('gameverse-v2.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 修改亚瑟的欢迎语（AI角色简介）
old_arthur_welcome = '"哎呀，召唤师你来啦！鲁班检测到这里有大量优质操作数据~（系统提示：检测到大量"连跪"波动）<br><br>王者峡谷点评区，无论你是顺风浪、逆风投，还是经典\\\\\\\\\\\\\\"都是队友的锅\\\\\\\\\\\\\\"，鲁班的AI都能精准识别！💡<br><br>小贴士：多提\\\\\\\\\\\\\\"五杀\\\\\\\\\\\\\\"\\\\\\\\\\\\\\"MVP\\\\\\\\\\\\\\"能触发鲁班的特殊彩蛋哦~（顺带一提，投降的按键是在右上角...咳咳）"'

new_arthur_welcome = '"正义，从未缺席！召唤师，欢迎来到王者峡谷点评区！<br><br>无论是精彩五杀还是团战翻盘，亚瑟都将见证你的荣耀时刻！作为峡谷的正义化身，我会用圣剑为你的精彩操作点赞！⚔️<br><br>记住：真正的强者不是从不失败，而是永不放弃！让我们一起守护峡谷的荣耀！（悄悄说：提到\\\\\\\\\\\\\\"转圈圈\\\\\\\\\\\\\\"和\\\\\\\\\\\\\\"正义\\\\\\\\\\\\\\"会有惊喜哦~）✨"'

content = content.replace(old_arthur_welcome, new_arthur_welcome)

# 2. 修改亚瑟的AI回复内容（第一条点评）
old_arthur_reply1 = '嘀嘀嘀~检测到顶级操作！这波五杀数据已录入鲁班数据库！🔍<br><br>\\n                        【鲁班AI分析】<br>\\n                        鲁班：\\\\\\\\\\\\\\"大招3次无敌躲控，手速测定为APM 180+\\\\\\\\\\\\\\"<br>\\n                        系统：\\\\\\\\\\\\\\"检测到敌方心态崩溃中...\\\\\\\\\\\\\\"<br>\\n                        鲁班：\\\\\\\\\\\\\\"建议对面直接投降节省时间！\\\\\\\\\\\\\\"😏<br><br>\\n                        <strong>⚡ 五杀彩蛋触发！</strong>鲁班偷偷告诉你：李白的大招其实可以躲亚瑟转圈圈！（但是鲁班的激光躲不了，嘿嘿嘿~）'

new_arthur_reply1 = '圣剑之光！这波操作堪称完美！正义之力与你同在！⚔️<br><br>\\n                        【亚瑟的正义点评】<br>\\n                        亚瑟：\\\\\\\\\\\\\\"三段大招躲控制，你已掌握了真正的战斗艺术！\\\\\\\\\\\\\\"<br>\\n                        圣剑：\\\\\\\\\\\\\\"检测到敌方士气-99%...\\\\\\\\\\\\\\"<br>\\n                        亚瑟：\\\\\\\\\\\\\\"记住，强者守护弱者，这才是荣耀！\\\\\\\\\\\\\\"💪<br><br>\\n                        <strong>⚡ 正义彩蛋！</strong>作为峡谷守护者，亚瑟告诉你：真正的五杀不在于击杀数，而在于守护队友的决心！（虽然李白确实可以躲我的转圈...但正义永不止步！）'

content = content.replace(old_arthur_reply1, new_arthur_reply1)

# 3. 修改亚瑟的建议
old_suggestions1 = "['出装可以试试\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"暴力流\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"，直接一刀秒脆皮！', '铭文别忘了带10个无双哦，鲁班提醒你！']"
new_suggestions1 = "['记住：顺风不浪，逆风不投，这是战士的信条！', '团战保护我方后排，才是真正的峡谷英雄！']"

content = content.replace(old_suggestions1, new_suggestions1)

# 4. 修改第二条亚瑟回复
old_arthur_reply2 = '数据分析报告已接收！鲁班的AI芯片正在高速运转！💻<br><br>\\n                        【鲁班的吐槽时间】<br>\\n                        鲁班：\\\\\\\\\\\\\\"嬴政的大招是真的烦人！\\\\\\\\\\\\\\"<br>\\n                        系统：\\\\\\\\\\\\\\"检测到被嬴政大招击杀132次...\\\\\\\\\\\\\\"<br>\\n                        鲁班：\\\\\\\\\\\\\\"闭嘴！那是因为队友不保护鲁班！\\\\\\\\\\\\\\"😤<br><br>\\n                        <strong>🎯 MVP彩蛋解锁！</strong>鲁班悄悄说：想快速上分，就选会玩的英雄别浪！（像鲁班这样稳定输出就对了，虽然鲁班经常被抓...）'

new_arthur_reply2 = '优秀的战术分析！数据不会说谎，但荣耀源于内心！⚔️<br><br>\\n                        【亚瑟的战术建议】<br>\\n                        亚瑟：\\\\\\\\\\\\\\"这些T0英雄确实强大，但请记住...\\\\\\\\\\\\\\"<br>\\n                        圣剑：\\\\\\\\\\\\\\"真正的胜利来自团队配合！\\\\\\\\\\\\\\"<br>\\n                        亚瑟：\\\\\\\\\\\\\\"没错！一个团结的队伍胜过五个独行侠！\\\\\\\\\\\\\\"💪<br><br>\\n                        <strong>🎯 荣耀箴言！</strong>峡谷守护者的忠告：英雄选择固然重要，但正义之心和永不放弃的精神才是上分的真谛！（顺风时记得帮助队友，逆风时更要坚守信念！）'

content = content.replace(old_arthur_reply2, new_arthur_reply2)

# 5. 修改第二条建议
old_suggestions2 = "['记住：排位≠训练营，别拿新英雄坑队友！', '鲁班建议：赛前先喝杯咖啡，保持清醒头脑！']"
new_suggestions2 = "['选英雄前先看阵容，团队大于个人！', '记住：每一场失败都是通往荣耀的阶梯！']"

content = content.replace(old_suggestions2, new_suggestions2)

print("✅ 亚瑟角色对话修改完成！")

# 6. 添加视频素材（使用示例视频链接）
# 在视频播放器中添加真实视频
old_video_player = '''<div class="video-player">
                                <div class="video-placeholder">
                                    <div class="play-btn"><span class="play-icon">▶</span></div>
                                </div>
                            </div>'''

new_video_player = '''<div class="video-player">
                                <video width="100%" controls>
                                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                                    您的浏览器不支持视频播放。
                                </video>
                            </div>'''

content = content.replace(old_video_player, new_video_player)
print("✅ 视频素材添加完成！")

# 7. 添加语音素材（使用音频标签替换波形图）
old_voice_player = '''<div class="voice-player">
            <div class="voice-controls">
                <button class="voice-play-btn">▶</button>
                <div class="voice-waveform">
                    <div class="waveform-bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
                <span class="voice-time">0:58</span>
            </div>
            <div class="voice-transcript">
                "语音转文字：这局深渊真的太难了！遗迹守卫血太厚了，雷神大招一套都打不死..."
            </div>
        </div>'''

new_voice_player = '''<div class="voice-player">
            <div class="voice-controls">
                <audio controls style="width:100%">
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                    您的浏览器不支持音频播放。
                </audio>
            </div>
            <div class="voice-transcript">
                "语音转文字：这局深渊真的太难了！遗迹守卫血太厚了，雷神大招一套都打不死..."
            </div>
        </div>'''

# 注意：由于voice-player可能在多个地方出现，这里只替换第一次出现
# content = content.replace(old_voice_player, new_voice_player, 1)
print("⚠️  语音播放器需要手动调整（模板中未包含）")

# 8. 添加彩蛋触发系统的CSS
easter_egg_css = '''
        /* 彩蛋动画 */
        .easter-egg {
            position: fixed;
            font-size: 5rem;
            pointer-events: none;
            z-index: 9999;
            animation: easterEggFloat 2s ease-out forwards;
        }

        @keyframes easterEggFloat {
            0% {
                transform: translateY(0) scale(0);
                opacity: 0;
            }
            30% {
                transform: translateY(-50px) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-200px) scale(0.5);
                opacity: 0;
            }
        }

        .tomato-explosion {
            animation: tomatoExplosion 1.5s ease-out forwards;
        }

        @keyframes tomatoExplosion {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(2) rotate(360deg);
                opacity: 0;
            }
        }

        .trash-can {
            animation: trashDrop 1.2s ease-out forwards;
        }

        @keyframes trashDrop {
            0% {
                transform: translateY(-300px) rotate(0deg);
                opacity: 0;
            }
            60% {
                transform: translateY(0) rotate(360deg);
                opacity: 1;
            }
            80% {
                transform: translateY(-30px);
            }
            100% {
                transform: translateY(0);
                opacity: 0;
            }
        }
    </style>'''

# 在</style>之前插入彩蛋CSS
content = content.replace('    </style>', easter_egg_css)
print("✅ 彩蛋CSS添加完成！")

# 9. 添加彩蛋触发的JavaScript
easter_egg_js = '''
        // 彩蛋关键词检测系统
        const easterEggKeywords = {
            '垃圾': '🗑️',
            '菜狗': '🍅',
            '牛逼': '🐂',
            '666': '👍',
            '哈哈': '😂'
        };

        // 创建彩蛋元素
        function triggerEasterEgg(keyword, x, y) {
            const egg = document.createElement('div');
            egg.className = 'easter-egg';
            
            // 根据关键词选择不同的动画类
            if (keyword === '垃圾') {
                egg.classList.add('trash-can');
            } else if (keyword === '菜狗') {
                egg.classList.add('tomato-explosion');
            }
            
            egg.textContent = easterEggKeywords[keyword] || '✨';
            egg.style.left = x + 'px';
            egg.style.top = y + 'px';
            
            document.body.appendChild(egg);
            
            // 2秒后移除元素
            setTimeout(() => {
                egg.remove();
            }, 2000);
        }

        // 监听所有文本输入和评论
        document.addEventListener('input', function(e) {
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
                const text = e.target.value;
                const rect = e.target.getBoundingClientRect();
                
                // 检测关键词
                for (let keyword in easterEggKeywords) {
                    if (text.includes(keyword)) {
                        triggerEasterEgg(keyword, rect.left + rect.width/2, rect.top);
                    }
                }
            }
        });

        // 监听点击事件（用于评论区）
        document.addEventListener('click', function(e) {
            // 为评论文本添加彩蛋检测
            const commentText = e.target.closest('.comment-text');
            if (commentText) {
                const text = commentText.textContent;
                const rect = commentText.getBoundingClientRect();
                
                for (let keyword in easterEggKeywords) {
                    if (text.includes(keyword)) {
                        triggerEasterEgg(keyword, rect.left + rect.width/2, rect.top);
                        break; // 每次点击只触发一个彩蛋
                    }
                }
            }
        });

'''

# 在最后一个</script>之前插入彩蛋JS
content = content.replace('    </script>\n</body>', easter_egg_js + '    </script>\n</body>')
print("✅ 彩蛋JavaScript添加完成！")

# 保存修改后的文件
with open('gameverse-v2.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n" + "="*50)
print("🎉 所有优化完成！")
print("="*50)
print("✅ 1. 亚瑟角色对话已更新为正义守护者风格")
print("✅ 2. 视频播放器已添加示例视频")
print("⚠️  3. 语音播放器建议使用自定义音频")
print("✅ 4. 彩蛋系统已添加（垃圾→🗑️，菜狗→🍅）")
print("="*50)
