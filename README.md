# **LabGuardian VisageAI Documentation**

## **Overview**

LabGuardian VisageAI (LabVisageAI) is a secure and scalable exam monitoring system designed to maintain academic integrity during online lab-based examinations. It provides real-time monitoring of client activities, malpractice detection, and centralized oversight for administrators using AI functionality.

**Status:** Actively developed. For stable use, refer to our original application [LabGuardian Visage](https://github.com/ShadowSKD/labguardian-visage).

---

## **Features**

1. **Real-Time Monitoring**: Track all student activity during exams.
2. **Malpractice Detection**: Alerts for suspicious or unauthorized activities.
3. **Secure Exam Sessions**: Lock labs to prevent unauthorized access.
4. **Admin Dashboard**: Manage users, labs, and exams.
5. **User Dashboard**: Start and monitor exams.
6. **Client Registration**: Students can register and participate in exams.
7. **Alerts Dashboard**: View and manage alerts for malpractice.
8. **AI Integration**: Automated analysis and alerting using AI models.

---

## **Project Structure**

```text
LabVisage/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── apiService/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── Dockerfile
│   ├── vite.config.js
│   ├── package.json
│   ├── index.html
│   ├── .env.example
│   └── .gitignore
├── docker-compose.yml
├── start.sh
├── start.bat
├── update_ip.sh
└── update_ip.bat
```

---

## **Backend**

### **Technologies**

- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing users, labs, and exam data.
- **JWT**: Authentication and authorization.

### **Key Files**

1. **`app.js`**: Entry point for the backend server.
2. **Controllers**:
   - [`userController.js`](backend/controllers/userController.js): Handles user registration, login, and updates.
   - [`clientController.js`](backend/controllers/clientController.js): Manages client registration, heartbeat, and exam lifecycle.
   - [`alertController.js`](backend/controllers/alertController.js): Handles alerts for malpractice.
   - [`adminController.js`](backend/controllers/adminController.js): Admin functionalities like managing labs and users.
3. **Models**:
   - [`userModel.js`](backend/models/userModel.js): Schema for user data.
   - [`labModel.js`](backend/models/labModel.js): Schema for lab data.
4. **Routes**:
   - [`userRoutes.js`](backend/routes/userRoutes.js): Routes for user-related operations.
   - [`clientRoutes.js`](backend/routes/clientRoutes.js): Routes for client-related operations.
   - [`alertRoutes.js`](backend/routes/alertRoutes.js): Routes for alert-related operations.
   - [`adminRoutes.js`](backend/routes/adminRoutes.js): Routes for admin-related operations.
5. **Services**:
   - [`clientStore.js`](backend/services/clientStore.js): In-memory store for client data.
   - [`alertStore.js`](backend/services/alertStore.js): In-memory store for alerts.
   - [`notificationService.js`](backend/services/notificationService.js): Sends notifications.
   - [`heartbeatService.js`](backend/services/heartbeatService.js): Monitors client activity.
   - [`genai.js`](backend/services/genai.js): AI-based analysis and alerting.

### **Environment Variables**

Refer to [`backend/.env.example`](backend/.env.example):

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://<Local_IPv4>:3000
```

---

## **Frontend**

### **Technologies Utilized**

- **React.js**: Frontend framework.
- **Vite**: Build tool for faster development.
- **Tailwind CSS**: Styling framework.
- **Axios**: HTTP client for API calls.

### **Additional Technology**

- **Nginx**: Used as a reverse proxy server for serving the frontend application in production.

### **Frontend Deployment with Nginx**

The frontend application is served using Nginx in the production environment. The [`Dockerfile`](frontend/Dockerfile) for the frontend includes the configuration to copy the build files and set up Nginx.

#### **Nginx Configuration**

- **Listening on Port 80**: The server listens for HTTP requests on port 80.
- **Server Name**: The server is configured to respond to requests directed to `localhost`.
- **Root Directory**: The root directory is set to `/usr/share/nginx/html`, where the static files of the frontend application (e.g., `index.html`, CSS, JavaScript) are located.
- **Default File**: The `index.html` file is specified as the default file to serve when accessing the root directory.
- **SPA Routing**: The `location /` block uses the `try_files` directive to handle routing, falling back to `index.html` for client-side routes.
- **Custom 404 Page**: The `error_page 404 /index.html;` directive ensures that any 404 errors are redirected to `index.html`, allowing the frontend application to handle the routing.

### **Key Files of Frontend**

1. **[`App.jsx`](frontend/src/App.jsx)**: Main application file defining routes.
2. **Pages** (in [`frontend/src/Pages/`](frontend/src/Pages/)):
   - `Home.jsx`: Landing page.
   - `Login.jsx`: Login page for users.
   - `AdminDashboard.jsx`: Admin dashboard for managing users and labs.
   - `UserDashboard.jsx`: User dashboard for starting and monitoring exams.
   - `ExamMonitoring.jsx`: Real-time monitoring of exams.
   - `AddUser.jsx` & `EditUser.jsx`: Add and edit user details.
   - `AddLab.jsx` & `EditLab.jsx`: Add and edit lab details.
   - `About.jsx`: About page with project details.
3. **Components** (in [`frontend/src/Components/`](frontend/src/Components/)):
   - `ProtectedRoute.jsx`: Protects routes based on authentication and roles.
4. **Styles** (in [`frontend/src/Styles/`](frontend/src/Styles/)):
   - `App.css`: Global styles.
   - `index.css`: Tailwind CSS imports.

### **Environment Variables of Frontend**

Refer to [`frontend/.env.example`](frontend/.env.example):

```env
VITE_API_URL=http://<your-ip>:5000/api
```

**Note**: This is required to be manually edited during development, but during build, the scripts automatically update this link for you.

---

## **Deployment**

### **Docker**

The project uses Docker for containerized deployment.

#### **Docker Compose**

Refer to [`docker-compose.yml`](docker-compose.yml):

```yml
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
    mem_limit: 512m
    cpus: 0.5

  frontend:
    build:
      context: ./frontend
      args:
        VITE_API_URL: ${VITE_API_URL}
    ports:
      - "3000:80"
    env_file:
      - ./frontend/.env
    mem_limit: 256m
    cpus: 0.25
    depends_on:
      - backend
```

#### **Build and Run**

1. Build and start containers:

   ```sh
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## **Scripts**

### **Start Scripts (Build Container)**

- **Windows**: [`start.bat`](start.bat)
- **Linux/Mac**: [`start.sh`](start.sh)
- **Note**: Before the build process, ensure Docker Engine is running (with Internet Connection). If no IPv4 address is found, input the IPv4 address of your main network when prompted.

### **Start Scripts (No Build)**

- **Windows**: [`start_nobuild.bat`](start_nobuild.bat)
- **Linux/Mac**: [`start_nobuild.sh`](start_nobuild.sh)

### **Update IP Scripts**

- **Windows**: [`update_ip.bat`](update_ip.bat)
- **Linux/Mac**: [`update_ip.sh`](update_ip.sh)

---

## **API Endpoints**

### **User Routes**

- `POST /api/users/register`: Register a new user (Admin only).
- `POST /api/users/login`: Login a user.
- `GET /api/users/:userId`: Get user details.
- `POST /api/users/:userId`: Edit user details.

### **Client Routes**

- `POST /api/clients/register`: Register a client.
- `POST /api/clients/heartbeat`: Send client heartbeat.
- `POST /api/clients/createexam`: Create a new exam.
- `POST /api/clients/startexam`: Start an exam.
- `POST /api/clients/endexam`: End an exam.
- `GET /api/clients/getallclients/:labcode`: Get all clients in a lab.

### **Alert Routes**

- `POST /api/alerts/:labCode/:clientId`: Report an alert.
- `GET /api/alerts/:labCode`: Get alerts for a lab.

### **Admin Routes**

- `POST /api/admin/labs`: Add a new lab.
- `DELETE /api/admin/labs/:labCode`: Delete a lab.
- `POST /api/admin/labs/:labId`: Edit a lab.
- `GET /api/admin/labs`: Get all labs.
- `GET /api/admin/labs/:labId`: Get lab details.
- `GET /api/admin/users`: Get all users.
- `DELETE /api/admin/users/:userId`: Delete a user.

---

## **Development**

### **For Frontend**

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

### **For Backend**

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

---

## **Contributors**

| Name              | Contribution                  |
|-------------------|-------------------------------|
| Srinidhi Chappar  | Frontend Development          |
| Suraj Kr Das      | Backend API Development       |

---

## **License**

This project was developed as part of a college assignment and is intended solely for educational and academic purposes. The implementation is based on research into existing technologies and their documentation. While we have strived to create a functional system, it is understood that the codebase may incorporate concepts and code patterns that are present in the broader technological landscape. No claims of original intellectual property are made on these pre-existing elements.
