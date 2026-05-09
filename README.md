# 🏢 Hostel Management System (HMS)

A premium, full-stack SaaS application for managing hostel operations. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with a modern **Tailwind CSS** aesthetic, this platform allows administrators to seamlessly manage student records, room allocations, and fee tracking from a single, secure dashboard.

---

## ✨ Features

*   **🔒 Secure Authentication:** JWT-based secure login with protected API routes.
*   **📊 Premium Dashboard:** Real-time analytics, live occupancy rates, and recent activity tracking.
*   **👨‍🎓 Student Management:** Full CRUD operations to register, edit, and delete student profiles.
*   **🛏️ Room Allocation:** Dynamic room assignment system. Rooms automatically update their occupancy status when students are assigned, unassigned, or deleted.
*   **💳 Fee Tracking:** Automated fee ledger. Adding a student automatically generates a fee record, allowing easy tracking of Paid/Pending statuses.
*   **📱 Mobile Responsive:** A fully responsive split-screen layout, mobile hamburger menus, and swipable data tables for on-the-go management.
*   **🎨 SaaS Aesthetics:** High-end UI/UX featuring glassmorphism, micro-animations, rich gradients, and custom SVGs.

---

## 🛠️ Tech Stack

**Frontend:**
*   React 19 (Vite)
*   Tailwind CSS v4
*   React Router DOM (for navigation)
*   Axios (for API requests)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose (Database & ORM)
*   JSON Web Tokens (JWT) for Authentication
*   Bcrypt.js (Password hashing)
*   Cors & Dotenv

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
*   [Node.js](https://nodejs.org/) installed
*   A [MongoDB](https://www.mongodb.com/) URI (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Hostel-Management-System.git
cd Hostel-Management-System
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and navigate to: `http://localhost:5173`

---

## 📂 Folder Structure

```text
Hostel-Management-System/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route logic (Auth, Students, Rooms, Fees)
│   ├── middleware/     # JWT Auth protection
│   ├── models/         # Mongoose schemas (User, Student, Room, Fee)
│   ├── routes/         # Express API routes
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── api/        # Axios API configurations
    │   ├── components/ # Reusable UI components (Sidebar, Navbar, Cards)
    │   ├── context/    # React Context (AuthContext)
    │   ├── layouts/    # Main Dashboard layout wrapper
    │   ├── pages/      # Main views (Login, Dashboard, Students, Rooms, Fees)
    │   ├── index.css   # Global Tailwind styles & animations
    │   └── App.jsx     # Router configuration
    └── package.json
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/Hostel-Management-System/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.