# Multi-User Todo Web Application

A full-stack multi-user todo application with authentication using Better Auth + JWT, persistent storage with Neon PostgreSQL, and a Next.js frontend.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure signup and signin functionality
- **JWT-Based Authentication**: Secure token-based authentication system
- **User Isolation**: Each user can only see and manage their own tasks
- **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- **Responsive UI**: Built with Next.js and Tailwind CSS for optimal user experience
- **Persistent Storage**: Using Neon PostgreSQL for reliable data storage
- **Modern Architecture**: Clean separation of concerns between frontend and backend

## 🛠️ Tech Stack

### Frontend
- **Next.js 16+**: React framework for production
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Better Auth**: Authentication library for Next.js applications

### Backend
- **FastAPI**: Modern, fast web framework for Python
- **Python 3.9+**: Programming language
- **SQLModel**: SQL database library
- **Pydantic**: Data validation library

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database

### Additional Tools
- **Alembic**: Database migration tool
- **PostCSS**: CSS processing tool
- **ESLint**: JavaScript/TypeScript linter

## 📁 Project Structure

```
hackathn2-phase-2/
├── backend/                    # FastAPI backend application
│   ├── alembic/               # Database migration files
│   │   ├── versions/          # Migration scripts
│   │   └── env.py             # Alembic environment
│   ├── auth.py                # Authentication logic
│   ├── auth_endpoints.py      # Authentication API endpoints
│   ├── database.py            # Database configuration
│   ├── main.py                # FastAPI application entry point
│   ├── models.py              # Database models
│   ├── task_endpoints.py      # Task management endpoints
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (not tracked)
├── frontend/                  # Next.js frontend application
│   ├── app/                   # Next.js app router pages
│   │   ├── dashboard/page.tsx # Dashboard page
│   │   ├── login/page.tsx     # Login page
│   │   ├── signup/page.tsx    # Signup page
│   │   └── layout.tsx         # Layout component
│   ├── components/            # Reusable React components
│   │   ├── LoginForm.js       # Login form component
│   │   ├── SignupForm.js      # Signup form component
│   │   ├── TodoForm.tsx       # Todo creation form
│   │   ├── TodoItem.tsx       # Individual todo item
│   │   ├── TodoList.tsx       # List of todos
│   │   ├── Header.tsx         # Header component
│   │   ├── Footer.tsx         # Footer component
│   │   └── Navbar.tsx         # Navigation bar
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/                   # Utility functions
│   │   ├── api.js             # API utility functions
│   │   └── auth-client.js     # Client-side auth utilities
│   ├── public/                # Static assets (not in this repo)
│   ├── styles/                # Global styles
│   ├── .env.local             # Local environment variables (not tracked)
│   ├── next.config.js         # Next.js configuration
│   ├── package.json           # Node.js dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   └── tailwind.config.js     # Tailwind CSS configuration
├── specs/                     # Project specifications and documentation
├── history/                   # Historical records and prompts
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
└── pyproject.toml             # Python project configuration
```

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Python](https://www.python.org/) (version 3.9 or higher)
- [Git](https://git-scm.com/)
- A [Neon PostgreSQL](https://neon.tech/) account

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

   Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL=your_neon_postgresql_connection_string
   BETTER_AUTH_SECRET=your_jwt_secret_key
   BETTER_AUTH_URL=http://localhost:8000
   ```

5. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

6. **Start the backend server:**
   ```bash
   python main.py
   ```

   The backend will start on `http://localhost:8000`

### Frontend Setup

1. **Open a new terminal window/tab and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

   Update the `.env.local` file with your configuration:
   ```env
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## 🔐 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
BETTER_AUTH_SECRET=super_secret_jwt_key_that_should_be_long_and_random
BETTER_AUTH_URL=http://localhost:8000
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory with the following variables:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## ▶️ Running the Application

### Development Mode

1. **Start the backend:**
   ```bash
   # From the backend directory
   python main.py
   ```

2. **Start the frontend:**
   ```bash
   # From the frontend directory
   npm run dev
   ```

3. **Access the application:**
   - Frontend: Open `http://localhost:3000` in your browser
   - Backend API: Available at `http://localhost:8000`

### Production Mode

1. **Build the frontend:**
   ```bash
   # From the frontend directory
   npm run build
   ```

2. **Serve the frontend:**
   ```bash
   # From the frontend directory
   npm start
   ```

3. **Start the backend:**
   ```bash
   # From the backend directory
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

## 🌐 API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user information

### Task Management Endpoints

- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{task_id}` - Get a specific task
- `PUT /api/tasks/{task_id}` - Update a specific task
- `DELETE /api/tasks/{task_id}` - Delete a specific task

### Health Check

- `GET /health` - Health check endpoint

## 🔧 Development

### Backend Development

- **Code formatting**: Use `black` for Python code formatting
- **Linting**: Use `flake8` for Python linting
- **Testing**: Use `pytest` for testing

### Frontend Development

- **Code formatting**: Use Prettier for consistent code formatting
- **Linting**: Use ESLint for JavaScript/TypeScript linting
- **Type checking**: Use TypeScript for type safety

### Database Migrations

When you make changes to the database models:

1. Create a new migration:
   ```bash
   alembic revision --autogenerate -m "Description of changes"
   ```

2. Apply the migration:
   ```bash
   alembic upgrade head
   ```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Workflow

1. Always pull the latest changes before starting work
2. Create feature branches for new functionality
3. Write tests for new features
4. Follow the existing code style and conventions
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/yourrepo/issues) section
2. Create a new issue if your problem isn't addressed
3. Include detailed information about your environment and the problem
4. Provide steps to reproduce the issue

---

Made with ❤️ using Next.js, FastAPI, and PostgreSQL