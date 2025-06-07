---
title: "MentorClass"
summary: "MentorClass is an innovative platform designed to connect students with experienced mentors for personalized learning experiences."
date: "Dec 27 2024"
draft: false
tags:
- React.js
- Node.js
- MongoDB

repoUrl: https://github.com/shubham-kumr/mentorclass
---

MentorClass is an innovative platform designed to connect students with experienced mentors for personalized learning experiences. Our platform facilitates seamless collaboration between learners and mentors through interactive sessions and real-time feedback.

## Technologies Used

- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/mentorclass.git
    cd mentorclass
    ```

2. **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3. **Install backend dependencies:**
    ```bash
    cd ../backend
    npm install
    ```

4. **Create a `.env` file in the backend directory:**
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

5. **Create a `.env` file in the frontend directory:**
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```

6. **Start the backend server:**
    ```bash
    cd backend
    npm run dev
    ```

7. **Start the frontend development server:**
    ```bash
    cd frontend
    npm start
    ```

The application should now be running on [http://localhost:3000](http://localhost:3000).