# 📝 Task Manager Web App

A full-stack task management web application built 
with 
**React**, 
**Express**, 
**MySQL (via Sequelize)**, 
and **JWT-based authentication**. 
Users can register, log in, and perform Read & Create operations on their personal tasks.

---

## 🔧 Tech Stack

### Frontend:
- ⚛️ React with Vite
- 🎨 TailwindCSS
- 🔥 react-hot-toast (notifications)
- 🛠 React Hook Form (form handling)
- 📦 Axios (API requests)
- 🔐 JWT stored in `localStorage`
- 📍 React Router DOM

### Backend:
- 🚀 Express.js
- 🗄 Sequelize ORM (MySQL)
- 🔐 JWT for Authentication
- 🧂 Bcrypt for Password Hashing
- 🌐 CORS for Cross-Origin Requests
- 📁 RESTful API Architecture

---

## 📁 Folder Structure
Task-Manager-Web-App/
│
├── backend/
│ ├── src/
│ │ ├── config/ # DB connection (Sequelize)
│ │ ├── controllers/ # Task & User controllers
│ │ ├── middlewares/ # Auth middleware, error handlers
│ │ ├── models/ # Sequelize models (User, Task)
│ │ ├── routes/ # API routes
│ │ ├── utilities/ # wrapAsync etc.
│ │ └── index.js # Entry point (Express app)
│ ├── .env
│ └── vercel.json
│
├── frontend/
│ ├── src/
│ │ ├── api/ # Axios base endpoints
│ │ ├── components/ # TaskDialog, TaskCard, FilterButtons etc.
│ │ ├── pages/ # Login, Signup, Dashboard
│ │ ├── authContext.jsx # Auth Provider
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── tailwind.config.js
│ ├── index.css
│ └── vite.config.js
│
└── README.md

---

## 🚀 Features

✅ User Registration & Login  
✅ JWT Authentication  
✅ Add, View Tasks  
✅ Filter tasks by Status (To Do, In Progress, Done)  
✅ Tailwind-powered UI with responsive layout  
✅ Toast notifications  

---

## ⚙️ Setup Instructions

### 🐳 Backend (Express + Sequelize)
```bash
cd backend
npm install
# Configure your .env
npm run dev   # or nodemon
🌐 Frontend (React + Vite)
bash
Copy
Edit
cd frontend
npm install
npm run dev

** Environment Variables (.env)**
In /backend/.env:

PORT=8000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=your_db_host
DB_PORT=3306
DB_DIALECT=mysql
JWT_SECRET_KEY=your_jwt_secret

** 🔐 Authentication Flow **
JWT issued during login/signup and stored in localStorage
Sent with Authorization: Bearer <token> header in protected routes
Auth middleware decodes the token and verifies the user

** 📌 Deployment **
✅ Frontend: Vercel
✅ Backend: Render / Railway / Vercel with vercel.json for config

