# EduTrack PRO 🎓

EduTrack PRO is a state-of-the-art, interactive Academic & Learning Management System designed to bridge the gap between students, faculty, and administrators. Built with a premium "Neo-Glassmorphism" design system, it provides a gamified, highly engaging personalized learning experience. 

The platform supports analytics-driven dashboards, real-time assignment tracking, attendance monitoring, and centralized student profile management (integrating external developer profiles like GitHub and LeetCode).

---

## 🛠 Tech Stack & Architecture

This project is built using the **MERN** stack (MongoDB, Express, React, Node.js) with a modern tooling ecosystem.

### Frontend (Client)
- **Framework:** React 18 powered by Vite (`create-vite`)
- **Styling:** Tailwind CSS (Custom Neo-Glassmorphism design system)
- **State Management & Data Fetching:** React Context API, Axios
- **Routing:** React Router DOM (v6)
- **Visuals & Charts:** `lucide-react` for iconography, `recharts` for complex analytics (Radar & Area charts)
- **Animations:** `framer-motion` for page transitions, custom Tailwind keyframes (blobs, pulses)

### Backend (Server)
- **Framework:** Node.js with Express.js
- **Database:** MongoDB via Mongoose ODM. *(Note: Includes an automatic fallback to `mongodb-memory-server` if a local instance on port 27017 is unavailable).*
- **Authentication:** Stateful Session-based Auth via `express-session` (MemoryStore) and `bcryptjs` for secure password hashing.
- **File Handling:** Local static uploads folder (`/uploads`) for assignment attachments.
- **API Structure:** RESTful API with route modularization (`/api/auth`, `/api/dashboard`, `/api/profile`, etc.)

---

## 🏗 Project Structure

The repository is organized into a monorepo-style structure separating client and server logic.

```
Edutrack/
├── client/                     # React Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components (HeaderNav, Footer, PageWrapper, ProtectedRoute)
│   │   ├── context/            # Global React Contexts (AuthContext, ThemeContext)
│   │   ├── pages/              # Route-level components (Dashboards, LoginHub, StudentProfile, etc.)
│   │   ├── index.css           # Global stylesheets & custom Tailwind @layer utilities (Glassmorphism)
│   │   ├── index.html          # HTML entry point (Injects Inter & Outfit fonts)
│   │   └── App.jsx             # Main Application routing and layout manager
│   ├── tailwind.config.js      # Tailwind configuration (Brand colors, Animations)
│   └── vite.config.js          # Vite config (Includes proxy for /api -> localhost:5000)
│
└── server/                     # Node.js/Express Backend Application
    ├── config/                 # Database connection logic (`db.js` with fallback logic)
    ├── middleware/             # Express middlewares (`auth.js` for role-based access control)
    ├── models/                 # Mongoose Data Schemas (User, Assignment, Attendance, Result, Submission)
    ├── routes/                 # Express Router definitions
    ├── uploads/                # Directory for locally uploaded assignment files
    ├── .env                    # Environment variables (PORT, MONGO_URI, SESSION_SECRET)
    └── server.js               # Entry point for backend server (Express app setup)
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Optional for local dev, highly recommended for production)

### 1. Backend Setup
```bash
cd server
npm install
npm start
```
*The server will start on port `5000`. If it cannot connect to MongoDB locally, it will automatically spin up an in-memory mock database and seed it with initial demo data (e.g., student1 / password123).*

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*The React app will run on port `5173` and proxy API requests to the backend.*

---

## 📋 Manual Action Items & Next Steps

To take this project from a local development state to a fully production-ready, real-world application, a human developer (or AI assistant) must execute the following manual steps:

1. **Connect a Persistent Database:**
   - Currently, the backend falls back to an in-memory database if MongoDB is not running locally.
   - **Action:** Create a MongoDB Atlas cluster, obtain the connection string, and create a `.env` file in the `server/` directory containing `MONGO_URI=mongodb+srv://...`
   - **Action:** Remove the `mongodb-memory-server` fallback logic in `server/config/db.js` once in production.

2. **Upgrade Authentication Mechanism:**
   - The app currently uses `express-session` with the default in-memory store. This will leak memory in production and clear sessions on every server restart.
   - **Action:** Implement `connect-mongo` to persist sessions in the MongoDB database, OR refactor the backend to use stateless **JWT (JSON Web Tokens)** stored in HttpOnly cookies.

3. **Migrate File Uploads to Cloud Storage:**
   - Assignment files are currently saved locally to the `server/uploads/` directory.
   - **Action:** Integrate an AWS S3 bucket (or Cloudinary/Firebase Storage) using `multer-s3` so uploaded files are stored reliably in the cloud instead of the local filesystem.

4. **Environment Variables Security:**
   - Ensure you replace fallback hardcoded secrets (like `SESSION_SECRET` in `server.js`) with strong, unique strings inside a secure `.env` file before deploying.

5. **Deployment Configuration:**
   - Configure a build pipeline. The frontend should be built (`npm run build`) and served either via a CDN (like Vercel/Netlify) or statically served by the Express backend.
   - Update CORS origins in `server/server.js` to point to the actual production domain rather than `localhost:5173`.
