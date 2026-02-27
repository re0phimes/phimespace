# Phimes Homepage Design

## Overview
导航主页，展示 phimes 旗下多个站点入口。

## Tech Stack
- React + Vite
- Tailwind CSS v4
- 部署：Vercel

## Page Structure

### Navbar
- 左侧：Logo（Phimes）
- 右侧：亮/暗模式切换按钮
- 固定在顶部

### Background
- 全屏固定，CSS linear-gradient 绘制 60px 网格
- @keyframes 动画对角线移动（8s 循环）
- 亮色：黑色线 6% 透明度；暗色：白色线 8% 透明度
- 底部 50% 渐变遮罩

### Cards Section
- 居中区域，CSS Grid 布局
- 3 张等大圆角卡片，初始各带微小旋转角度（-3deg ~ 3deg）
- Hover：scale(1.05) + rotate(0deg) + 阴影提升，transition 300ms
- 卡片内容：截图 + 站点名 + 描述
- 点击新标签页打开对应站点
- 响应式：桌面 3 列 / 平板 2 列 / 手机 1 列

### Sites Data

| Site | URL | Description |
|------|-----|-------------|
| AI FAQ | https://aifaq.phimes.top | AI 问答知识库 |
| Demo | https://demo.phimes.top | 项目演示 |
| Blog | https://blog.phimes.top | 技术博客 |

### Dark/Light Toggle
- Tailwind dark mode（class 策略）
- localStorage 持久化用户偏好

### Screenshots
- 静态截图图片，定期手动更新
- 存放在 public/screenshots/ 目录
