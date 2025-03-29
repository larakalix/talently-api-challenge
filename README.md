# 🚀 Task Management API

This is an Express-powered REST API for managing tasks, including authentication, CRUD operations, and user-specific data. The API is designed to use full JWT-based authentication and Firebase Firestore integration.

## 📋 Features

-   User Registration & Login (JWT Auth)
-   Create, Read, Update, and Delete (soft delete) tasks
-   Task ownership enforcement (users can only manage their own tasks)
-   Retrieve active tasks
-   Password hashing with secure methods
-   Swagger UI for interactive API docs
-   Serverless-ready Docker build (optimized for AWS Lambda)
-   MongoDB integration (via Motor)

## 📂 Endpoints Overview

## 📂 Endpoints Overview

| **Method** | **Endpoint**           | **Description**                  | **Auth Required** |
| ---------- | ---------------------- | -------------------------------- | ----------------- |
| `POST`     | `/api/auth/register`   | Register a new user              | ❌                |
| `POST`     | `/api/auth/login`      | Login and get JWT token          | ❌                |
| `GET`      | `/api/tasks`           | Get list of all active tasks     | ❌                |
| `POST`     | `/api/tasks`           | Create a new task                | ✅                |
| `PUT`      | `/api/tasks/{task_id}` | Update a task by ID              | ✅                |
| `DELETE`   | `/api/tasks/{task_id}` | Soft-delete a task by ID         | ✅                |

## 🛠️ Tech Stack

-   Express
-   Firebase Firestore
-   JWT Authentication
-   Vercel

## ⚙️ Environment Variables

```bash
FIREBASE_API_KEY=<your_key>
FIREBASE_AUTH_DOMAIN=<your_domain>
FIREBASE_APP_ID=<your_app_id>
FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
FIREBASE_MESSAGE_SENDER_ID=<your_sender_id>
FIREBASE_PROJECT_ID=<your_project_id>
FIREBASE_MEASUREMENT_ID=<your_measurement_id>
```

## 🚀 Deployment

### Running Locally

```bash
pnpm dev
```

Access the API at:
http://localhost:8000

Swagger docs:
http://localhost:8000/docs

### Deploy to Vercel

1. Just push into main branch, any push is going to trigger a new deployment. NOTE: Any case that fails, version is going to keep the last one.

## 🔐 Authentication

-   Use the /api/auth/login endpoint to get a JWT token.
-   Pass the token in the Authorization header as: Authorization: Bearer <your_token>_

## 📚 API Docs (Swagger)

-   Once the app is running, access interactive docs at: http://localhost:8000/docs

## 💡 Notes

-   Uses soft delete by changing task status to Deleted.
-   Passwords are hashed securely before storage.
