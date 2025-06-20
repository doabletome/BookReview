# 📚 BookReview Platform

A full-stack MERN application where users can browse books, read/write reviews, and rate titles. Admins can also add new books to the platform.

## 🚀 Features

- 🔐 User authentication with JWT (login/register)
- 📖 View book listings and detailed pages
- 📝 Authenticated users can post reviews and ratings
- 🔍 Search books by title (with debouncing)
- 👤 User profile with review history and editable profile
- 🧑‍💻 Admin route to add new books
- 🌐 Fully responsive UI using **Tailwind CSS**
- ⚙️ Built with **Redux Toolkit**, **React Router**, and **MongoDB**

---

## 🛠 Tech Stack

| Frontend      | Backend           | Database |
| ------------- | ----------------- | -------- |
| React + Vite  | Node.js + Express | MongoDB  |
| Tailwind CSS  | JWT Auth          | Mongoose |
| Redux Toolkit | REST API          |          |

---

## 📂 Folder Structure

```
bookreview/
├── client/              # React frontend
│   ├── components/      # Reusable UI components
│   ├── features/        # Redux slices (auth, books, reviews)
│   ├── hooks/           # Custom hooks (e.g. debouncing)
│   ├── pages/           # Page-level components (Home, Profile, etc.)
│   ├── routes/          # AppRoutes, PrivateRoute, RequireAdmin
│   └── api/axios.js     # Axios config with JWT injection
├── server/              # Express backend
│   ├── controllers/     # Route handlers (books, auth, reviews)
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routers
│   └── server.js        # App entry point
├── .env
└── README.md
```

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bookreview.git
cd bookreview
```

---

### 2. Setup backend (Express + MongoDB)

```bash
cd server
npm install
```

#### Create a `.env` file in `/server` with:

```
PORT = 5000
MONGO_URL = mongodb://127.0.0.1:27017/bookreview
JWT_SECRET = my_secret
JWT_EXPIRES_IN = 2h
FRONTEND_URL = http://localhost:5173
```

Initialise you DB

```bash
npm run init-db
```

this command will seed sample books and admin to you DB

admin credential:
email - admin@gmail.com
password = adminpass

Start the backend:

```bash
npm run dev
```

---

### 3. Setup frontend (React + Vite)

```bash
cd ../client
npm install
```

#### Create a `.env` file in `/client` with:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

## 🧪 Sample Credentials

| Role  | Email            | Password  |
| ----- | ---------------- | --------- |
| Admin | admin@gmail.com  | adminpass |
| User  | user@example.com | 123456    |

> ⚠️ You can register your own users; admin must be set manually in DB.

---

## 🧰 Future Improvements

- Pagination on reviews
- File upload for avatar (Cloudinary)
- Review edit/delete
- Book categories or tags
- Dark mode toggle

---

---

## 👨‍💻 Author

**Himanshu Patle**  
🔗 [LinkedIn](https://www.linkedin.com/in/himanshu-patle-205411221/) • 📧 patlehimanshu98@gmail.com

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
