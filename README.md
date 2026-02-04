# 📊 React Virtualized Data Table

A high-performance data table built with React that supports sorting, filtering, and virtual scrolling for handling large datasets efficiently.

---

## 🚀 Features

- ✅ Dynamic column configuration
- ✅ Column-wise filtering
- ✅ Ascending & Descending sorting
- ✅ Virtual scrolling (fast for large data)
- ✅ Optimized rendering using useMemo
- ✅ Responsive UI with Tailwind CSS

---

## 🛠️ Technologies Used

- React
- Tailwind CSS
- @tanstack/react-virtual
- JavaScript (ES6+)
- Vite

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project-folder
```


## 2. Install Dependencies
npm install

## 3. Install Tailwind
npm install tailwindcss @tailwindcss/vite

## 4. update Vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

## 5. Update CSS file
@import "tailwindcss"

## 6. Install Virtual Scroll Library
npm install @tanstack/react-virtual

## 7. Run The Project
npm run dev

## Project Structure
src/
│
├── components/
│   ├── Datatable.jsx
│   └── Sorting.jsx
│
├── Dummydata.js
├── App.jsx
└── main.jsx
