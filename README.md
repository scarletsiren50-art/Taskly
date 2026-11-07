# Taskly – Advanced MERN To-Do List Application

<p align="center">
  <img src="frontend/public/assets/taskly-logo.png" alt="Taskly Logo" width="300"/>
</p>

<p align="center">
  **A Full-Stack Task Management Application built using the MERN Stack**
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Internship-CODEC%20Technologies-blueviolet"/>
  <img src="https://img.shields.io/badge/Role-Full%20Stack%20Developer%20Intern-blue"/>
  <img src="https://img.shields.io/badge/Stack-MERN-green"/>
  <img src="https://img.shields.io/badge/Status-Completed-success"/>
</p>

---

## 👩‍💻 About the Developer

| Detail | Information |
|---|---|
| **Name** | Md. Sadiya Tabassum |
| **College** | IFHE, Hyderabad |
| **Academic Status** | Final-Year B.Tech Student |
| **Course** | B.Tech – Data Science and Artificial Intelligence |
| **Internship Organization** | CODEC Technologies India |
| **Internship Task** | Task 2 - To-Do List Application (Advanced MERN Architecture) |
| **Internship Designation** | Full Stack Developer Intern |
| **Internship Location** | Pan India – Hybrid |
| **Internship Duration** | 27 October 2026 – 27 November 2026 |


---

## 📌 Project Overview

**Taskly** is an advanced, full-stack task management application developed as part of the Full Stack Developer Internship at **CODEC Technologies India**.

The application provides users with a centralized platform to organize, manage, track and monitor their daily tasks efficiently.

Taskly follows a modern MERN architecture, combining a React-based frontend, Node.js and Express.js backend, and MongoDB database.

The application includes secure user authentication, complete task management functionality, task categorization, priority management, filtering, sorting, pagination and productivity statistics through an interactive dashboard.

The project focuses on implementing practical full-stack development concepts, RESTful API architecture, database integration, authentication, responsive UI design and cloud deployment.

## 🎯 Project Objectives

- Develop a complete full-stack web application using the MERN stack.
- Implement secure user registration and login.
- Build RESTful APIs for task management.
- Perform Create, Read, Update and Delete (CRUD) operations.
- Implement task status and priority management.
- Integrate server-side validation and error handling.
- Implement search, filtering, sorting and pagination.
- Design a responsive and user-friendly interface.
- Deploy the frontend and backend using cloud platforms.

---

## ✨ Key Features

### 1. User Authentication
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected routes.
- Forgot password functionality.
- Password reset through email using Brevo.
- Password visibility toggle.

### 2. Interactive Dashboard
- Overview of total tasks.
- Pending task statistics.
- In-progress task statistics.
- Completed task statistics.
- Task overview visualization.
- Today's tasks.
- Productivity tracking.

### 3. Task Management
- Create new tasks.
- View all saved tasks.
- Edit existing tasks.
- Delete tasks with confirmation.
- Update task status.
- Assign priorities.
- Categorize tasks.
- Set due dates and descriptions.

### 4. Advanced Task Features
- Search tasks.
- Filter by status.
- Filter by category.
- Sort tasks.
- Server-side pagination.
- Task ownership and user-specific data.

### 5. User Profile
- View and manage profile information.
- Productivity statistics.
- Account preferences.
- Notification preferences.
- Theme settings.

### 6. User Interface
- Consistent Taskly branding.
- Custom Taskly logo.
- Light and dark themes.
- Responsive layout.
- Reusable React components.
- Loading states and empty states.
- Toast notifications.
- Confirmation dialogs.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Programming Language | JavaScript |
| Styling | CSS3 |
| Icons | Lucide React |
| Backend | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Password Security | bcrypt |
| Validation | express-validator |
| Email Service | Brevo |
| HTTP Client | Axios |
| API Testing | Thunder Client |
| Version Control | Git and GitHub |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## 🏗️ System Architecture

Taskly follows a three-layer MERN application architecture.

```text
              USER
                |
                v
       REACT FRONTEND (VITE)
                |
              AXIOS
                |
                v
       EXPRESS REST API
                |
       ------------------
       |       |        |
    Routes  Middleware Controllers
                       |
                       v
                  MONGOOSE
                       |
                       v
                  MONGODB
```

### Architecture Components

**Frontend Layer**
- React components and pages.
- React Hooks for state management.
- Axios for API communication.
- React Router for navigation.

**Backend Layer**
- Express.js REST APIs.
- Authentication middleware.
- Validation middleware.
- Controllers for application logic.
- Centralized error handling.

**Database Layer**
- MongoDB for persistent storage.
- Mongoose models for users and tasks.
- User-specific task ownership.

---

## 📂 Project Structure

```text
Taskly/
│
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       └── taskly-logo.png
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── Sidebar.jsx
│   │   │   └── BrandLogo.jsx
│   │   │
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── MyTasks.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── taskService.js
│   │   │   └── userService.js
│   │   │
│   │   ├── routes/
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── taskController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 🔗 API Documentation

Base URL:

```text
https://taskly-backend-r2sj.onrender.com
```

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### Task APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve user tasks |
| GET | `/api/tasks/:id` | Retrieve a specific task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### User APIs

Base route:

```text
/api/users
```

User endpoints are implemented through the user routes and protected where authentication is required.

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend availability |

---

## 🗄️ Database Design

Taskly uses MongoDB with two primary collections.

### User Collection

Stores user account information.

Key fields:
- Name
- Email
- Password (hashed)
- Profile image
- Preferences
- Notification settings
- Password reset token and expiry

### Task Collection

Stores individual tasks associated with users.

Key fields:
- Title
- Description
- Due date
- Priority
- Status
- Category
- User reference
- Created and updated timestamps

### Task Status

- Pending
- In Progress
- Completed

### Task Priority

- Low
- Medium
- High

### Task Categories

- Academic
- Design
- Development
- Documentation
- Personal
- Other

---

## ⚙️ Installation and Setup

Follow these steps to run Taskly locally.

### Prerequisites

Install the following:

- Node.js and npm
- MongoDB Atlas account or local MongoDB
- Git
- Visual Studio Code

### 1. Clone the Repository

```bash
git clone https://github.com/scarletsiren50-art/Taskly.git
```

```bash
cd Taskly
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

Add the following configuration:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key

BREVO_SENDER_EMAIL=your_verified_sender_email

BREVO_SENDER_NAME=Taskly

FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm start
```

If your backend package uses a different start script, run:

```bash
node src/server.js
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## 🌐 Live Deployment

Taskly is deployed using Vercel and Render.

| Component | Platform | Link |
|---|---|---|
| Frontend | Vercel | https://taskly-seven-sigma.vercel.app |
| Backend | Render | https://taskly-backend-r2sj.onrender.com |
| Source Code | GitHub | https://github.com/scarletsiren50-art/Taskly |

### Deployment Configuration

**Frontend – Vercel**
- Framework: Vite
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL`

**Backend – Render**
- Runtime: Node.js
- Root directory: `backend`
- Build command: `npm install`
- Start command: `node src/server.js`
- Health check: `/api/health`

---

## 🧪 Testing

The application uses Thunder Client inside Visual Studio Code for REST API testing.

Testing covers:

- User registration.
- User login.
- Authentication and JWT verification.
- Task creation.
- Task retrieval.
- Task updates.
- Task deletion.
- Task filtering and pagination.
- Server-side validation.
- Password reset workflow.
- Backend health check.
- Frontend and backend integration.

---

## 🔐 Security Considerations

- Passwords are hashed using bcrypt.
- JWT tokens are used for authentication.
- Protected endpoints require valid authentication.
- User-specific task access is enforced.
- Input validation is implemented using express-validator.
- Environment variables are used for sensitive configuration.
- `.env` files and API credentials are excluded from GitHub.

**Never commit actual API keys, database credentials, JWT secrets or email service credentials to the repository.**

---

## 🚀 Future Enhancements

Potential improvements for future versions include:

- Task reminders and scheduled notifications.
- Recurring tasks.
- Calendar integration.
- Collaborative task management.
- Task sharing between users.
- Advanced analytics and productivity reports.
- File attachments.
- Mobile application support.
- More advanced dashboard visualizations.

---

## 📚 Learning Outcomes

Through this project, I gained practical experience in:

1. Full-stack application development using the MERN stack.
2. Designing and implementing RESTful APIs.
3. Connecting React frontend applications with Express backends.
4. Implementing JWT authentication and password security.
5. Working with MongoDB and Mongoose.
6. Implementing CRUD operations.
7. Managing application state using React Hooks.
8. Implementing server-side validation and error handling.
9. Testing APIs using Thunder Client.
10. Managing source code using Git and GitHub.
11. Deploying full-stack applications using Vercel and Render.
12. Debugging production issues involving CORS, environment variables and API connectivity.

---

## 👩‍💻 Author

**Md. Sadiya Tabassum**

Final-Year B.Tech Student  
Data Science and Artificial Intelligence  
IFHE, Hyderabad

Full Stack Developer Intern  
CODEC Technologies India

- GitHub: https://github.com/scarletsiren50-art
- LinkedIn: https://www.linkedin.com/in/sadiya-tabassum-aa8459339

---

## 📄 Internship Project Declaration

This project, **Taskly – Advanced MERN To-Do List Application**, was developed as part of my Full Stack Developer Internship at **CODEC Technologies India**, scheduled from **27 October 2026 to 27 November 2026**.

The project demonstrates the practical application of full-stack web development concepts, database management, REST API development, authentication, frontend engineering and cloud deployment.

---

## 📜 License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.
---

<p align="center">
  **Built with ❤️ by Md. Sadiya Tabassum**
</p>

<p align="center">
  © 2026 Taskly. All Rights Reserved.
</p>
