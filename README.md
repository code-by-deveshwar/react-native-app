# 👤 User Explorer App

A modern React Native app built with **Expo**, **TypeScript**, and **TailwindCSS** that fetches and displays users from [reqres.in](https://reqres.in). Includes pagination, search, favorite management, and glassmorphic UI.

---

## 📱 Features

### 🌐 API Integration
- Fetches users from both pages of the `https://reqres.in/api/users` endpoint
- Combines and deduplicates user data
- Adds support for pull-to-refresh

### 🎨 UI/UX
- Responsive, mobile-first layout
- Glassmorphism on cards and search bar (blur, translucency, depth)
- Animated card entry using Reanimated (`FadeInUp`)
- Full background image for aesthetic depth
- Safe area support for notch devices

### 🧭 Navigation
- Tab-based navigation (`All Users` and `Favorites`)
- Icons via `Ionicons`
- No `(tabs)` label shown in header

### 📝 User Management
- Tap to favorite/unfavorite users (⭐)
- Realtime toggle reflected in Favorites tab
- Clean fallback UI if no users found after search

### 🔍 Search
- Search bar at top of list
- Real-time filtering by first/last name

---

## 🧰 Tech Stack

- ⚛️ React Native + Expo
- 🟦 TypeScript
- 💨 TailwindCSS via `nativewind`
- 🧠 React Context for global state
- ✨ Reanimated v3 for smooth animations
- 📱 Fully responsive + supports dark backgrounds

---

## 📦 Setup

```bash
git clone https://github.com/your-username/user-explorer-app.git
cd user-explorer-app
npm install
npx expo start


This project uses the free x-api-key: reqres-free-v1.
To avoid quota limits, consider signing up at reqres.in/signup for your own key.