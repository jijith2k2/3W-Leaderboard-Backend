# Leaderboard Backend

This is the backend service for the Leaderboard web application, built with Node.js, Express, and MongoDB (Mongoose).

## Features
- User management (add/select users)
- Award and track points
- Leaderboard sorted by total points
- Claim history tracking

## Folder Structure
```
backend/
│
├── models/
│   ├── User.js
│   └── ClaimHistory.js
│
├── routes/
│   ├── userRoutes.js
│   └── claimRoutes.js
│
├── controllers/
│   ├── userController.js
│   └── claimController.js
│
├── config/
│   └── db.js
│
└── server.js
```

## Getting Started

### 1. Clone the repository
```
git clone <your-backend-repo-url>
cd backend
```

### 2. Install dependencies
```
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory:
```
MONGO_URI=your_mongodb_atlas_uri_here
PORT=5000
```

### 4. Run the server
```
npx nodemon server.js
```

## API Endpoints

### Users
- `GET /api/users` — Fetch all users
- `POST /api/users` — Add a new user `{ name }`

### Claims
- `POST /api/claim` — Claim points `{ userId, points }`
- `GET /api/leaderboard` — Get leaderboard (sorted by total points)
- `GET /api/history/:userId` — Get claim history for a user

## Deployment
- Deploy on Render or Railway
- Use MongoDB Atlas for database hosting

## Notes
- Ensure your MongoDB Atlas cluster allows connections from your deployment host.
- All endpoints return JSON responses.

---

For frontend setup, see the corresponding frontend repository. 