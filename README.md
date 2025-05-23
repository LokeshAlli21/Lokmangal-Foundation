# 🌟 Lokmangal Foundation

> **Full-stack web application for Lokmangal Foundation, built with React, Redux, Node.js, and Express.**

Lokmangal Foundation is a Matrimonial website . This project combines both frontend and backend in a single repository for easy development and deployment.

## 🚀 Live Demo

**Frontend & Backend Deployed:**  
[Visit Lokmangal Foundation](https://lokmangal-foundation.vercel.app)

## 🖥️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Deployment
- Frontend: Vercel
- Backend: NA

## 📂 Project Structure

```
Lokmangal-Foundation/
├── backend/
│   ├── controllers/           # Route controllers for handling logic
│   ├── routes/                # Express routes
│   ├── server.js              # Entry point of backend server
│   └── package.json           # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── assets/            # Static assets like images
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Application pages (Home, Login, Signup)
│   │   ├── store/             # Redux store setup
│   │   ├── App.jsx            # Main App component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global CSS
│   └── package.json           # Frontend dependencies
│
├── vercel.json                # Vercel configuration for frontend and backend
└── README.md                  # Project documentation
```

## 🌟 Features

- ✅ Full-stack architecture: React + Express
- ✅ Clean and responsive UI with Tailwind CSS
- ✅ API routing and backend logic with Express.js
- ✅ State management using Redux Toolkit
- ✅ Proper CORS handling for frontend-backend communication
- ✅ Deployment ready on Vercel (frontend + backend)
- ✅ Component-based structure for scalability

## 🧩 Pages Included

- **Home Page:** Overview of the Lokmangal Foundation and its purpose
- **Login Page:** User login interface
- **Signup Page:** New user registration form

## ⚙️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/LokeshAlli21/Lokmangal-Foundation.git
cd Lokmangal-Foundation
```

### Setup Backend

```bash
cd backend
npm install

# Start backend server
npm run dev
# By default runs on http://localhost:5000
```

### Setup Frontend

```bash
cd frontend
npm install

# Start frontend server
npm run dev
# By default runs on http://localhost:5173
```

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```
PORT=5000
# Add other environment variables if needed
```


```

4. Vercel will auto-detect both frontend and backend, and deploy!

## 🤝 Contributing

Contributions are welcome! 🚀

If you have ideas, bug fixes, or improvements:
```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/YourFeature

# 3. Commit your changes
git commit -m "Add YourFeature"

# 4. Push to the branch
git push origin feature/YourFeature

# 5. Open a Pull Request
```

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ by Lokesh Alli**
