# 🎬 Movie Watchlist App

A powerful and beautiful movie watchlist app built with **React**, **Tailwind CSS**, and the **TMDB API**.

This app allows you to search for movies, view details, and maintain a personal watchlist with advanced features like notes, watched status, and ratings — all persisted locally in your browser.

---

## 🚀 Features

- 🔍 **Live Movie Search** using TMDB API (debounced input)
- 🎞️ **Movie Details Modal** with poster, year, rating, and overview
- 🎬 **Watchlist** with:
  - Add / Remove movies
  - Prevent duplicate entries
  - Persist state in `localStorage`
  - Personal notes (auto-save with debounce)
  - Watched/unwatched toggle
  - ⭐ Star-based rating system (1–5)

---

## 🧠 Tech Stack

- **React (Vite)** for fast frontend dev
- **Tailwind CSS** for modern, dark-themed UI
- **useReducer + useDebounce** for state management and performance
- **LocalStorage** for persistent state
- **TMDB API** for movie search

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/movie-watchlist-app.git

# Navigate into the project folder
cd movie-watchlist-app

# Install dependencies
npm install

# Start the dev server
npm run dev
```
