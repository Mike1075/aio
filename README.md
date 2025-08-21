# 🌟 启明星 (Morning Star) - AI驱动智慧学习与管理平台

这是河北师范大学软件学院的AI驱动智慧学习与管理平台的MVP版本。

## ✨ 功能特性

### 学生功能
- 🎯 个性化学习计划和进度跟踪
- 🤖 AI学习助手 - 基于知识库的智能问答
- 📊 学习进度可视化展示
- ⏰ 学习任务和截止日期管理

### 教师功能
- 👥 学生学习情况总览
- 📈 班级学习数据分析
- ⚠️ 学业风险预警系统
- 🔍 学生搜索和筛选

### 技术特性
- 🔐 Supabase身份认证系统
- 💬 Google Gemini AI集成
- 📚 基础RAG知识库检索
- 📱 响应式界面设计

## 🛠️ 技术栈

- **前端**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes, Supabase
- **AI**: Google Gemini Pro
- **部署**: Vercel
- **图标**: Lucide React

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- Supabase账户
- Google AI API密钥

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd morning-star
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env.local` 文件并添加以下配置：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. 启动开发服务器
```bash
npm run dev
```

5. 访问应用
打开 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API路由
│   │   └── chat/          # AI聊天接口
│   ├── login/             # 登录页面
│   ├── teacher/           # 教师功能页面
│   └── page.tsx           # 主页面
├── components/            # React组件
│   ├── auth/              # 认证相关组件
│   ├── layout/            # 布局组件
│   ├── student/           # 学生功能组件
│   └── teacher/           # 教师功能组件
└── lib/                   # 工具库
    ├── supabase.ts        # Supabase客户端配置
    ├── types.ts           # TypeScript类型定义
    └── knowledge-base.ts  # 知识库数据和搜索
```

## 🔧 部署

### Vercel部署

1. 推送代码到GitHub
2. 在Vercel中导入项目
3. 配置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_AI_API_KEY`
4. 部署完成

### 环境变量配置

在Vercel Dashboard中设置以下环境变量：
- 生产环境和预览环境都需要配置
- 确保所有API密钥的安全性

## 🔐 安全注意事项

- 🚨 环境变量包含敏感信息，请勿提交到代码仓库
- 🔒 生产环境中应配置Row Level Security (RLS)
- 🛡️ 实施API速率限制和访问控制

## 📈 未来发展

这是MVP版本，后续将添加：
- 完整的用户角色管理
- 高级AI功能和工作流
- 数据库集成和持久化
- 更丰富的知识库内容
- 移动端优化
- 与AIP平台的深度集成

## 🤝 贡献

欢迎提交Issues和Pull Requests来改进这个项目。

## 📄 许可证

此项目仅供河北师范大学软件学院内部使用。

---

🌟 让AI点亮每个学生的学习之路！
