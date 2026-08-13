🛡️ CredCheck
CredCheck is a MERN-stack based digital certificate and internship verification platform designed to help students securely manage their credentials and allow organizations/verifiers to verify them.

The platform provides role-based access for Students, Verifiers, and Administrators, along with certificate management, verification requests, public certificate verification, and abuse reporting.

🚀 Live Demo
Frontend
https://credcheck-frontend.onrender.com

Backend API
https://credcheck-backend-332e.onrender.com

GitHub Repository
https://github.com/AnubhavSemwal

✨ Features
👨‍🎓 Student
Create an account and login
Google authentication
Secure JWT authentication
Upload certificates
Manage uploaded certificates
Track certificate verification
Generate public certificate verification links
View certificate status
🏢 Verifier
Register as a verifier
Submit verifier registration request
Wait for administrator approval
View verification requests
Verify student certificates
Approve or reject certificate verification requests
👨‍💼 Administrator
Admin dashboard
Manage users
Manage verifier requests
Approve or reject verifier accounts
Manage certificate verification
View abuse reports
Resolve reported issues
Role-based authorization
🔐 Security & Authentication
JWT authentication
Password hashing using bcrypt
Google OAuth 2.0 authentication
Role-based authorization
Protected API routes
Environment variables for sensitive credentials
☁️ Cloud Services
MongoDB Atlas for database hosting
Cloudinary for certificate/file storage
Nodemailer/Gmail for email services
Render for deployment
🛠️ Tech Stack
Frontend
React.js
Vite
React Router
Axios
Bootstrap
Bootstrap Icons
Google OAuth
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
Multer
Cloudinary
Nodemailer
Google Auth Library
Deployment
GitHub
Render
MongoDB Atlas
Cloudinary
📂 Project Structure
CredCheck/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── email.js
│   │
│   ├── controllers/
│   │   ├── abuseReportController.js
│   │   ├── adminController.js
│   │   ├── auth.controller.js
│   │   ├── certificate.controller.js
│   │   ├── verifier.controller.js
│   │   └── verifierRequest.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── models/
│   │   ├── AbuseReport.js
│   │   ├── Certificate.js
│   │   ├── User.js
│   │   └── VerifierRequest.js
│   │
│   ├── routes/
│   │   ├── abuseReport.route.js
│   │   ├── adminRoutes.js
│   │   ├── auth.route.js
│   │   ├── certificate.route.js
│   │   ├── verifier.route.js
│   │   └── verifierRequest.route.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
⚙️ Installation
1. Clone the repository
git clone https://github.com/ankit17670/credcheck.git
cd credcheck
🔧 Backend Setup
Go to the backend folder:

cd backend
Install dependencies:

npm install
Create a .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
Start the backend:

npm start
Development mode:

npm run dev
Backend runs locally at:

http://localhost:5000
🎨 Frontend Setup
Open another terminal:

cd frontend
Install dependencies:

npm install
Create:

frontend/.env
Add:

VITE_API_URL=http://localhost:5000
Start the frontend:

npm run dev
The frontend will normally run at:

http://localhost:5173
🌐 Production Environment
For the deployed frontend, the API environment variable is:

VITE_API_URL=https://credcheck-backend-332e.onrender.com
The frontend is deployed on Render and communicates with the deployed backend through this environment variable.

🔑 Authentication Flow
CredCheck supports two authentication methods:

Email & Password
User
 ↓
Register
 ↓
Password hashed with bcrypt
 ↓
MongoDB
 ↓
Login
 ↓
JWT generated
 ↓
Frontend stores JWT
Google Login
User
 ↓
Google Login
 ↓
Google Credential
 ↓
CredCheck Backend
 ↓
Google Token Verification
 ↓
User created/found
 ↓
JWT generated
 ↓
Dashboard
👥 User Roles
Role	Access
Student	Certificates, dashboard, verification
Verifier	Certificate verification
Admin	Users, verifiers, reports, administration
🔄 Certificate Verification Flow
Student uploads certificate
          ↓
Certificate stored
          ↓
Verification request
          ↓
Verifier reviews certificate
          ↓
Verifier approves/rejects
          ↓
Certificate status updated
          ↓
Public verification available
📡 API Overview
Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
Certificates
/api/certificates
Verifier
/api/verifier
Verifier Requests
/api/verifier-request
Admin
/api/admin
Abuse Reports
/api/abuse-report
🖥️ Deployment
CredCheck is deployed using Render.

Backend
Render Web Service
        ↓
Node.js + Express
        ↓
MongoDB Atlas
        ↓
Cloudinary
        ↓
Nodemailer
Frontend
Render Static Site
        ↓
React + Vite
        ↓
CredCheck Backend API
🔒 Environment Variables
Sensitive credentials should never be committed to GitHub.

Make sure .env is included in .gitignore.

Example:

.env
node_modules/
dist/
Never publish:

MongoDB passwords
JWT secrets
Cloudinary API secrets
Gmail app passwords
Google OAuth secrets
📸 Screenshots
Add screenshots of the project here:

Home Page
Login Page
Student Dashboard
Verifier Dashboard
Admin Dashboard
Certificate Verification
🎯 Project Objectives
The main objectives of CredCheck are:

Reduce fake certificate submission
Provide secure digital credential verification
Allow organizations to verify certificates
Provide role-based access
Provide publicly accessible certificate verification
Improve trust in student credentials
Provide a centralized certificate management platform
🔮 Future Improvements
QR code based certificate verification
Email notifications
Advanced admin analytics
Certificate expiry tracking
Blockchain-based credential verification
Improved document fraud detection
Mobile application
AI-assisted certificate verification
👨‍💻 Author
Ankit Singh

B.Tech Computer Science Engineering

GitHub: https://github.com/AnubhavSemwal
📄 License
This project is developed for educational and internship purposes.
