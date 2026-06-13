# AI Voice Agent 🎙️🤖

An interactive, voice-enabled AI Assistant built using **React**, **Node.js/Express**, **MongoDB**, **Redis**, and **Gemini API**. Users can create, name, and customize their own personal AI voice assistant, talk to it using speech-to-text, and have it speak back or perform automated actions (like searching YouTube, opening Google Maps, opening social media, checking the weather, and more).

---

## 🚀 Live Deployments
* **Frontend (Render):** [https://aivoiceagent-frontents.onrender.com](https://aivoiceagent-frontents.onrender.com)
* **Backend (Railway):** [https://aivoiceagent-production-1a3f.up.railway.app](https://aivoiceagent-production-1a3f.up.railway.app)

---

## 🛠️ Technology Stack

### Frontend (`/Frontent`)
* **Core:** React 19, Vite (Fast builds)
* **Styling:** TailwindCSS 4, Framer Motion (Premium animations)
* **State Management:** Redux Toolkit
* **API Calls:** Axios
* **Authentication:** Firebase (Google Authentication fallback)

### Backend (`/Backend`)
* **Core:** Node.js, Express (ES6 Modules)
* **Databases:** MongoDB (with Mongoose) for user data & Redis for caching/sessions
* **File Uploads:** Multer & Cloudinary (for custom assistant avatar images)
* **AI Engine:** Google Gemini API (`gemini-2.5-flash` model) for intent detection & spoken responses

---

## 🌟 Key Features

1. **Custom Assistant Setup:** Sign up, sign in, and create your custom assistant. Choose its avatar (uploaded via Cloudinary), name it, and define its behavior.
2. **Voice & Text Interaction:** Speak directly to your agent. Speech is converted to text, processed by Gemini, and then spoken back to you.
3. **Intent Detection & Actions:** The AI understands natural language commands and triggers automated browser actions on the frontend:
   * 🔍 **Google Search:** *"Search for space exploration on Google"*
   * 🎥 **YouTube Play/Search:** *"Play lo-fi music on YouTube"*
   * 📍 **Google Maps:** *"Open maps"*
   * 📅 **Utility Openers:** Automatically opens Gmail, Google Calendar, Calculator, WhatsApp, and social networks (Instagram, Facebook, LinkedIn, Twitter).
   * 🌤️ **Weather & Cricket:** Intent detection for checking weather and looking up cricket news/scores.

---

## 📂 Folder Structure

```text
AiVoiceAgent/
├── Backend/               # Express API
│   ├── config/            # DB and Redis connection configurations
│   ├── Controllers/       # Auth and User controllers
│   ├── Models/            # MongoDB schema models (User, etc.)
│   ├── routes/            # Route endpoints (/api/auth, /api/user)
│   ├── middleware/        # Authentication & file upload middlewares
│   ├── Gemni.js           # Gemini API logic & prompts
│   ├── index.js           # Express main entry file
│   └── package.json
│
├── Frontent/              # Vite + React Client
│   ├── src/
│   │   ├── Animation/     # Framer Motion animations & Footer
│   │   ├── Componen/      # App components (Card, Gemini UI)
│   │   ├── Pagination/    # Pages (Home, SignIn, SignUp, Customize)
│   │   ├── Redux/         # Redux global state config (userSlice)
│   │   ├── utils/         # Axios configurations & Google Auth setup
│   │   ├── App.jsx        # Main routes & session check
│   │   └── main.jsx       # App entrypoint
│   └── package.json
└── README.md              # Root documentation
```

---

## ⚙️ Environment Variables

To run the project locally or deploy it to production, you need to configure the following environment variables.

### Backend (`/Backend/.env`)
Create a `.env` file inside the `Backend` directory:
```env
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRATE_KEY=your_jwt_secret_key

# Cloudinary (For Avatar Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Gemini API Endpoint & Key
GOOGLE_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_GEMINI_API_KEY"
```

### Frontend (`/Frontent/.env`)
Create a `.env` file inside the `Frontent` directory (used for Firebase Google Auth):
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## 💻 Running the Project Locally

### Prerequisites
* **Node.js** (v18+)
* **MongoDB** (Local or MongoDB Atlas)
* **Redis Server** (Local or Redis Labs Cloud instance)

### 1. Start the Backend
1. Open a terminal and navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (uses `nodemon` for auto-reloading):
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8000`.

### 2. Start the Frontend
1. Open a new terminal and navigate to the `Frontent` folder:
   ```bash
   cd Frontent
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (uses Vite):
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or the next available port).

---

## 🌐 Deployment Instructions

### Deploying Backend to Railway
1. Push your repository to GitHub.
2. In Railway, create a **New Service** from your GitHub repo.
3. In **Settings -> General**: Set **Root Directory** to `Backend`.
4. In **Settings -> Deploy**: Set **Start Command** to `node index.js`.
5. Under **Variables**: Add all the variables from your local `Backend/.env` file.
6. Under **Public Networking (Settings)**: Generate a domain to expose your backend publicly.
7. Whitelist `0.0.0.0/0` (any IP) in MongoDB Atlas to allow Railway to connect.

### Deploying Frontend to Render
1. In Render, create a **Static Site** linked to your GitHub repo.
2. Set **Root Directory** to `Frontent`.
3. Set **Build Command** to `npm run build`.
4. Set **Publish Directory** to `dist`.
5. Under **Environment Variables**: Add your frontend Firebase config variables.
6. In `Frontent/src/utils/axois.js`, make sure `baseURL` is pointing to your Railway backend URL.
7. In `Backend/index.js`, make sure your CORS `origin` matches your Render deployment URL.
