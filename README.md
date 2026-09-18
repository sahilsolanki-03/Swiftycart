# SwiftyCart 🛒

A full-stack ecommerce web application built with React and Node.js.

---

## 🗂️ Project Structure

```
Swiftycart/
├── Frontend/
│   └── swiftycart/        → React 19 + Vite (UI)
└── Backend/               → Node.js + Express.js + MongoDB (API)
```

---

## ⚙️ Tech Stack

| Layer    | Technology                   |
| -------- | ---------------------------- |
| Frontend | React 19, Vite               |
| Backend  | Node.js, Express.js          |
| Database | MongoDB (Mongoose)           |
| Auth     | JWT (jsonwebtoken),          |

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### 2. Frontend Setup

```bash
cd Frontend/swiftycart
npm install
npm run dev
```

---

## 🔐 Backend Environment Variables

Backend folder mein `.env` file banao aur yeh variables daalo:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📦 Backend Dependencies

- `express` — Web framework
- `mongoose` — MongoDB ODM
- `jsonwebtoken` — JWT authentication
- `bcryptjs` — Password hashing
- `cors` — Cross-origin requests
- `dotenv` — Environment variables

## 🖥️ Frontend Dependencies

- `react` — UI library
- `react-dom` — DOM rendering
- `vite` — Build tool & dev server
