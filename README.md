# Assignment Submission Portal

## Overview

The Assignment Submission Portal is a backend system where users can upload assignments, and admins can accept or reject them. It uses Node.js, Express.js, and MongoDB to handle users and admins, providing authentication and authorization.

## Features

- User and Admin registration and login.
- Users can upload assignments.
- Admins can accept or reject assignments.
- Secure authentication with JWT.

## Technologies

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/saurabh78crypto/assignment-portal.git
cd assignment-portal
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file and add the following:
```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
PORT=5000
```
4. Start the server
```bash
npm start
``` 