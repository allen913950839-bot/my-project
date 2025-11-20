export interface Company {
  id: string;
  name: string;
  logo: string;
  themeColor: string;
  description: string;
}

export interface AIPersona {
  name: string;
  avatar: string;
  greeting: string;
  personality: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  hasVideo?: boolean;
  timestamp: string;
  likes: number;
  aiReply: string;
}

export interface Game {
  id: string;
  companyId: string;
  title: string;
  cover: string;
  themeColor: string;
  aiPersona: AIPersona;
  reviews: Review[];
}

export const companies: Company[] = [
  {
    id: 'nintendo',
    name: '任天堂',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop',
    themeColor: '#e60012',
    description: '自1889年起，用游戏创造笑容',
  },
  {
    id: 'blizzard',
    name: '暴雪娱乐',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop',
    themeColor: '#00aeff',
    description: '史诗级娱乐体验',
  },
  {
    id: 'hoyoverse',
    name: '米哈游',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
    themeColor: '#8b5cf6',
    description: '技术宅拯救世界',
  },
  {
    id: 'capcom',
    name: 'Capcom',
    logo: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=400&fit=crop',
    themeColor: '#ff6b00',
    description: '难忘的游戏体验',
  },
];

export const games: Game[] = [
  {
    id: 'zelda-totk',
    companyId: 'nintendo',
    title: '塞尔达传说：王国之泪',
    cover: 'https://images.unsplash.com/photo-1578374173703-16119952f6cb?w=800&h=1200&fit=crop',
    themeColor: '#4ade80',
    aiPersona: {
      name: '林克',
      avatar: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=200&h=200&fit=crop',
      greeting: '你好，旅行者！我是林克，你在海拉鲁的向导。来分享你的冒险故事吧！',
      personality: '勇敢、爱冒险、乐于助人',
    },
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: '天空玩家',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        content: '新的制作系统简直太棒了！建造载具的感觉就像魔法一样。10/10会再次探索海拉鲁！',
        images: ['https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop'],
        timestamp: '2小时前',
        likes: 234,
        aiReply: '你的创造力回荡在这片大地上！佐纳乌族一定会为你的工程技能感到骄傲。你建造过最大胆的装置是什么？',
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: '三角力量猎人',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        content: '空岛美得令人窒息！自由的感觉无与伦比。有史以来最棒的塞尔达！',
        hasVideo: true,
        timestamp: '5小时前',
        likes: 189,
        aiReply: '天空中隐藏着许多秘密，勇敢的人！你的热情温暖了我的心，就像哈特诺村的阳光清晨。',
      },
      {
        id: 'r3',
        userId: 'u3',
        userName: '海拉鲁探险家',
        userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
        content: '物理谜题充满挑战但很有成就感。每个神庙都像是一个新发现。',
        timestamp: '1天前',
        likes: 156,
        aiReply: '智慧指引着你的道路！每座神庙都讲述着古代智慧的故事。愿女神保佑你的旅程！',
      },
      {
        id: 'r4',
        userId: 'u4',
        userName: '大师之剑使用者',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        content: '战斗感觉比以往任何时候都流畅。融合能力增加了很多战术深度！',
        images: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop'],
        timestamp: '1天前',
        likes: 201,
        aiReply: '你的战士精神闪耀着光芒！将武器与材料结合是真正英雄的标志。保持锐利！',
      },
      {
        id: 'r5',
        userId: 'u5',
        userName: '塞尔达超级粉丝',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        content: '这个故事让我哭了。塞尔达和林克的羁绊刻画得很美。纯粹的杰作！',
        timestamp: '2天前',
        likes: 412,
        aiReply: '你的话触动了我的灵魂！公主和我分享着超越时间的羁绊。感谢你与我们一起走过这段路。',
      },
    ],
  },
  {
    id: 'mario-wonder',
    companyId: 'nintendo',
    title: '超级马力欧兄弟：惊奇',
    cover: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=1200&fit=crop',
    themeColor: '#ef4444',
    aiPersona: {
      name: '马力欧',
      avatar: 'https://images.unsplash.com/photo-1578374173703-16119952f6cb?w=200&h=200&fit=crop',
      greeting: '我是马力欧！欢迎来到花之王国！让我们一起去冒险吧！',
      personality: '开朗、充满活力、永远乐观',
    },
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: '平台高手',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        content: '惊奇种子带来了如此多的创意！每个关卡都是惊喜。任天堂太棒了！',
        timestamp: '3小时前',
        likes: 178,
        aiReply: '哇呼！你的兴奋让我想跳得更高！让我们一起找更多惊奇种子吧！',
      },
      {
        id: 'r7',
        userId: 'u7',
        userName: '花之王国粉丝',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        content: '新的道具太棒了！大象马力欧是我的最爱。太好玩了！',
        images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop'],
        timestamp: '6小时前',
        likes: 245,
        aiReply: '妈妈咪呀！大象形态太棒了！继续踩那些栗子小子吧！',
      },
      {
        id: 'r8',
        userId: 'u8',
        userName: '复古玩家88',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        content: '自SNES时代以来最好的2D马力欧。美术风格太漂亮了！',
        timestamp: '1天前',
        likes: 312,
        aiReply: '谢谢！花之王国很美丽，和你分享它让它更加特别！',
      },
      {
        id: 'r9',
        userId: 'u9',
        userName: '合作大师',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        content: '和朋友一起玩太棒了！在线多人游戏运行完美。',
        hasVideo: true,
        timestamp: '1天前',
        likes: 189,
        aiReply: '让我们一起出发！朋友让每次冒险都更美好。雅虎！',
      },
      {
        id: 'r10',
        userId: 'u10',
        userName: '徽章收藏家',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        content: '徽章系统增加了很多深度！尝试不同的组合令人上瘾。',
        timestamp: '2天前',
        likes: 156,
        aiReply: '太棒了！混合徽章就像给披萨加额外配料——总是更好！',
      },
    ],
  },
  {
    id: 'genshin-impact',
    companyId: 'hoyoverse',
    title: '原神',
    cover: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=1200&fit=crop',
    themeColor: '#4fc3f7',
    aiPersona: {
      name: '派蒙',
      avatar: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=200&h=200&fit=crop',
      greeting: '派蒙在这里！让我们一起探索提瓦特，分享我们的冒险吧！',
      personality: '可爱、充满活力、总是饿',
    },
    reviews: [
      {
        id: 'r21',
        userId: 'u21',
        userName: '旅行者主力',
        userAvatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=100&h=100&fit=crop',
        content: '新的枫丹地区绝对令人惊叹！水下探索太棒了！',
        images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'],
        timestamp: '1小时前',
        likes: 567,
        aiReply: '哦！派蒙喜欢在枫丹游泳！水好漂亮！你找到宝箱了吗？',
      },
      {
        id: 'r22',
        userId: 'u22',
        userName: '祈愿大师',
        userAvatar: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=100&h=100&fit=crop',
        content: '刚抽到我梦想的五星角色！今天被祈愿眷顾了！',
        timestamp: '4小时前',
        likes: 423,
        aiReply: '耶！恭喜恭喜！运气太好了！现在让我们一起去冒险吧！',
      },
      {
        id: 'r23',
        userId: 'u23',
        userName: '传说探索者',
        userAvatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=100&h=100&fit=crop',
        content: '剧情任务越来越好了！文笔太棒了。',
        timestamp: '6小时前',
        likes: 312,
        aiReply: '派蒙喜欢好故事！提瓦特的传说充满了神秘！',
      },
      {
        id: 'r24',
        userId: 'u24',
        userName: '深渊征服者',
        userAvatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=100&h=100&fit=crop',
        content: '终于深渊满星了！组队很有成就感。',
        hasVideo: true,
        timestamp: '12小时前',
        likes: 278,
        aiReply: '哇！你好厉害！派蒙佩服你！让我们用蜜汁胡萝卜煎肉庆祝一下！',
      },
      {
        id: 'r25',
        userId: 'u25',
        userName: '拍照模式粉丝',
        userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
        content: '这个游戏是摄影师的梦想。每个角度都值得截图！',
        images: ['https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=300&fit=crop'],
        timestamp: '1天前',
        likes: 634,
        aiReply: '派蒙想出现在所有照片里！提瓦特好美，对吧？',
      },
    ],
  },
  {
    id: 'honkai-star-rail',
    companyId: 'hoyoverse',
    title: '崩坏：星穹铁道',
    cover: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=1200&fit=crop',
    themeColor: '#ffd700',
    aiPersona: {
      name: '三月七',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
      greeting: '嗨呀！我是三月七！准备好登上星穹列车探索宇宙了吗？',
      personality: '活泼、好奇、永远乐观',
    },
    reviews: [
      {
        id: 'r26',
        userId: 'u26',
        userName: '星际航行者',
        userAvatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop',
        content: '回合制战斗从未感觉如此好！动画太华丽了！',
        timestamp: '2小时前',
        likes: 389,
        aiReply: '对吧！每场战斗都像是宇宙之舞！让我们拍些胜利自拍吧！',
      },
      {
        id: 'r27',
        userId: 'u27',
        userName: '遗器农夫',
        userAvatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=100&h=100&fit=crop',
        content: '遗器刷本系统太上瘾了！再刷一次就好...',
        images: ['https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop'],
        timestamp: '5小时前',
        likes: 234,
        aiReply: '帕姆说列车永不停歇！让我们一起刷完美词条吧！',
      },
      {
        id: 'r28',
        userId: 'u28',
        userName: '模拟宇宙高手',
        userAvatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&h=100&fit=crop',
        content: '模拟宇宙是最好的终局模式！变化太多了。',
        timestamp: '8小时前',
        likes: 267,
        aiReply: '宇宙充满惊喜！每次模拟都是新冒险！',
      },
      {
        id: 'r29',
        userId: 'u29',
        userName: '剧情享受者',
        userAvatar: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=100&h=100&fit=crop',
        content: '匹诺康尼篇章是杰作！抽卡游戏中最好的故事。',
        hasVideo: true,
        timestamp: '1天前',
        likes: 512,
        aiReply: '梦境世界太棒了！虽然我更喜欢真实的回忆...即使我的有点模糊！',
      },
      {
        id: 'r30',
        userId: 'u30',
        userName: '零氪冠军',
        userAvatar: 'https://images.unsplash.com/photo-1464863979621-258859e62245?w=100&h=100&fit=crop',
        content: '超级零氪友好！没花一分钱就得到了我最喜欢的角色！',
        timestamp: '1天前',
        likes: 445,
        aiReply: '看吧？梦想成真了！星穹列车欢迎所有人登车！',
      },
    ],
  },
];
