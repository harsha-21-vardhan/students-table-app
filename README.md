# 📚 Students Registry — Full-Stack App

A complete **Students Table Application** built with **React + Vite** (frontend) and **NestJS + PostgreSQL + Prisma** (optional backend). Supports full CRUD, Excel export, search/filter, and loading state simulation.

---

## 🗂️ Project Structure

```
students-app/
├── frontend/                       # React + Vite application
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       │   ├── StudentTable.jsx    # Sortable table with actions
│       │   ├── StudentForm.jsx     # Add/Edit form with validation
│       │   └── ConfirmDialog.jsx   # Delete confirmation modal
│       ├── pages/
│       │   └── Dashboard.jsx       # Main page with all controls
│       ├── hooks/
│       │   └── useStudents.js      # useReducer state management
│       ├── utils/
│       │   └── excelExport.js      # xlsx export (full & filtered)
│       ├── data/
│       │   └── students.json       # Seed data
│       └── styles/
│           └── global.css          # Custom CSS design system
│
└── backend/                        # NestJS + Prisma (optional bonus)
    ├── nest-cli.json
    ├── tsconfig.json
    ├── package.json
    ├── .env.example
    ├── prisma/
    │   └── schema.prisma           # Prisma schema (PostgreSQL)
    └── src/
        ├── main.ts                 # App bootstrap with CORS
        ├── app.module.ts
        ├── prisma/
        │   ├── prisma.service.ts
        │   └── prisma.module.ts
        └── students/
            ├── students.module.ts
            ├── students.controller.ts
            ├── students.service.ts
            └── dto/
                └── student.dto.ts  # class-validator DTOs
```

---

## ✨ Features

### Frontend
| Feature | Details |
|---|---|
| **CRUD Operations** | Add, Edit, Delete students with modal forms |
| **Form Validation** | Required fields, email format, age as number (1–120) |
| **Search / Filter** | Real-time filter by name or email |
| **Sortable Table** | Click column headers to sort asc/desc |
| **Delete Confirmation** | Modal dialog before any deletion |
| **Loading States** | Skeleton loader on fetch, spinner on save |
| **Excel Export** | Export all data or only filtered results via `xlsx` |
| **localStorage** | Persists student data across page refreshes |
| **Toast Notifications** | Success/error feedback on every action |
| **Responsive** | Works on mobile, tablet, and desktop |

### Backend (Bonus)
| Feature | Details |
|---|---|
| **NestJS REST API** | `GET /students`, `POST /students`, `PUT /students/:id`, `DELETE /students/:id` |
| **PostgreSQL + Prisma** | Type-safe ORM with migrations |
| **Validation** | `class-validator` DTOs for all inputs |
| **CORS** | Configured for frontend origin |
| **Error Handling** | `NotFoundException`, `ConflictException` for duplicate emails |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- (For backend) PostgreSQL 14+ running locally or a cloud instance

---

### Frontend — Run Locally

```bash
# 1. Navigate to the frontend directory
cd students-app/frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# App runs at http://localhost:3000
```

**Build for production:**
```bash
npm run build
# Output in dist/
```

---

### Backend — Run Locally

```bash
# 1. Navigate to the backend directory
cd students-app/backend

# 2. Install dependencies
npm install

# 3. Copy and configure environment variables
cp .env.example .env
# Edit .env and set your DATABASE_URL

# 4. Generate Prisma client
npm run prisma:generate

# 5. Run database migrations
npm run prisma:migrate

# 6. Start the development server
npm run start:dev

# API runs at http://localhost:4000
```

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/students` | Get all students |
| `GET` | `/students/:id` | Get student by ID |
| `POST` | `/students` | Create new student |
| `PUT` | `/students/:id` | Update student by ID |
| `DELETE` | `/students/:id` | Delete student by ID |

### Example Request Body (POST/PUT)

```json
{
  "name": "Alice Johnson",
  "email": "alice@university.edu",
  "age": 21
}
```

---

## 📦 Tech Stack

### Frontend
- **React 18** with Hooks (`useState`, `useReducer`)
- **Vite** — dev server and bundler
- **xlsx (SheetJS)** — Excel export
- **Custom CSS** — No framework, design system in `global.css`

### Backend
- **NestJS 10** — framework
- **Prisma 5** — ORM
- **PostgreSQL** — database
- **class-validator** — DTO validation

---

## 🚢 Deployment

### Frontend → Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# From the frontend directory
cd students-app/frontend
npm run build

# Deploy to Vercel
vercel

# Follow prompts:
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist
```

**Or via Vercel Dashboard:**
1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Set **Root Directory** to `frontend`
5. Vercel auto-detects Vite → click **Deploy**

---

### Frontend → Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

cd students-app/frontend
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Or via Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
2. Connect your GitHub repo
3. Set **Base directory**: `frontend`
4. Set **Build command**: `npm run build`
5. Set **Publish directory**: `dist`
6. Click **Deploy site**

---

### Backend → Railway

1. Push your full repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
3. Select the repo → choose the `backend` service
4. Add a **PostgreSQL** plugin in Railway dashboard
5. Railway auto-injects `DATABASE_URL` — copy it and verify in **Variables**
6. Add environment variables:
   ```
   PORT=4000
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
7. Set the **Start command**: `npm run start`
8. Set the **Build command**: `npm run build && npm run prisma:generate && npm run prisma:migrate`

---

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Root directory**: `backend`
   - **Build command**: `npm install && npm run prisma:generate && npm run build`
   - **Start command**: `node dist/main`
4. Add a **PostgreSQL** database in Render → copy the **Internal Database URL**
5. Set environment variables in Render dashboard:
   ```
   DATABASE_URL=<your-render-postgres-url>
   PORT=4000
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
6. Run migrations after first deploy via Render Shell:
   ```bash
   npm run prisma:migrate
   ```

---

## 📝 Environment Variables

### Frontend (no `.env` required for frontend-only mode)
If connecting to backend, create `frontend/.env`:
```env
VITE_API_URL=https://your-backend.railway.app
```

Then in `useStudents.js`, replace the local state logic with Axios calls to `import.meta.env.VITE_API_URL`.

### Backend
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/students_db?schema=public"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

---

## 🎨 Design System

The app uses a custom **refined academic** design system:
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Palette**: Warm off-white background, forest green accents
- **Components**: Cards, skeleton loaders, toast notifications, sortable tables
- **Motion**: Subtle fade-in, scale animations, shimmer skeletons

---

## 📄 License

MIT — free to use, modify, and distribute.
