<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

# 📘 Project Description

This is a NestJS-based server-side application built with TypeScript. It uses PostgreSQL as the database and provides API documentation via Swagger.

---

## ⚙️ Requirements

- **Node.js**: `v20.15.1`
- **npm**
- **PostgreSQL**: Local instance
- **.development.env** file (with DB credentials)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create the PostgreSQL Database
Ensure PostgreSQL is running locally, then create the database:

CREATE DATABASE amk;

### 4. Configure Environment Variables
Open .development.env and update the following:
TYPEORM_USERNAME=your_db_username
TYPEORM_PASSWORD=your_db_password
Make sure the username/password match your local PostgreSQL credentials.

### 5. Run Database Migrations
```bash
npm run typeorm:run
```
This will apply all pending migrations to your database.
### 6. Start the Development Server
```bash
npm run start:dev
```

### 7. Access the API Documentation
Once the server is running, open your browser and navigate to:
http://localhost/amk-swagger-docs
