## End-to-End Solution for a Short Form Application

This project is an end-to-end solution built using ReactJS, NodeJS, and Formik. It involves creating a short form with fields for name, last name, country, city, email, and phone number, along with an optional profile picture upload. The application adheres to the provided design guidelines and utilizes Docker, Formik, and Express as mandatory technologies.


## Table of Contents
 - [Technologies Used](#technologies-used)
 - [Installation](#installation)
   1. [Clone the Repository ](#1-clone-the-repository)
   2. [Navigate to the Project Directory](#2-navigate-to-the-project-directory)
   3. [Install Dependencies](#3-install-dependencies)
   4. [Set Up Environment Variables](#4-set-up-environment-variables)
   5. [Database Setup](#5-database-setup)
     - Option 1: Automatic Migration and Seeding with Docker Compose (Recommended)
     - Option 2: Manual Migration and Seeding
 - [Usage](#usage)
 - [Features](#features)
 - [Opportunities for Improvement](#opportunities-for-improvement)
   1. [Implement Authentication with Passport.js](#implement-authentication-with-passport.js)
   2. [Secure Password Handling](#secure-password-handling)
   3. [Token Management with JWT](#token-management-with-jwt)
   4. [Create an AuthGuard](#create-an-authguard)
   5. [Implement Rate Limiting](#Implement-rate-limiting)
   6. [Standardize API Response Structure](#Standardize-API-Response-Structure)



### Technologies Used
 - ##### Frontend : React, Formik, Material-UI
 - ##### Backend : NodeJS, Express (NestJS framework)
 - ##### Database : PostgreSQL (Dockerized)
 - ##### Other Tools: : Docker

### Installation

 ##### 1- Clone the Repository
```bash
git clone git@github.com:WalidMsallem/Datatys.git
```

 ##### 2- Navigate to the Project Directory
```bash
cd Datatys
```

 ##### 3- Install Dependencies
  ##### Backend
```bash
 cd backend
 npm install
```
  ##### Frontend:
```bash
 cd ../frontend
 npm install
```

 ##### 4- Set Up Environment Variables
 -- Backend: Create a .env file in the backend directory and add necessary configurations.
 ```bash
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name
```
--Frontend: If required, create a .env file in the frontend directory.
 ##### 5- Database Setup
The application uses a PostgreSQL database. You can choose to run migrations and seed data manually, or let Docker Compose handle it automatically.
 ###### Option 1: Automatic Migration and Seeding with Docker Compose (Recommended)
Running the application with Docker Compose will automatically build the services, run migrations, and seed the data.
 ```bash
 docker-compose up --build
```
This command will start all the services defined in your docker-compose.yml file, including the database, backend. The initial migration and data seeding will be performed automatically.

 ###### Option 2: Manual Migration and Seeding
 If you prefer to run database migrations and seed data manually, follow the steps below.
 ```bash
docker-compose up -d db
```
Run Migrations:
 ```bash
# Generate a new migration (if needed)
 docker-compose exec db npm run migration:create

# Run migrations
 docker-compose exec db npm run migration:up
```

Seed the Database:
 ```bash
 docker-compose exec backend  npm run seed
```

 #####   6- Start the Application:
  - Backend : 
 ```bash
 docker-compose up --build
```
  - Frontend : 
 ```bash
 cd ../frontend
 npm start
```

### Usage
- Access the application at `http://localhost:3000`
- Login to some spesefic user's acount 
- Fill out the form and submit your information.
- Upload a profile picture.
- The data will be stored in the PostgreSQL database.


### Features
- Responsive Form: Built with ReactJS and Formik for efficient form handling and validation.
- Design Compliance: Uses the specified fonts and colors: 
- Responsive UI
- Backend API: Developed using NodeJS and Express (NestJS framework) for robust API endpoints.
- Database Integration: Data is stored in a PostgreSQL database, managed via Docker.
- File Upload: Users can optionally upload a profile picture, which is handled securely on the server.

### Opportunities for Improvement
While the current implementation meets the basic requirements, there are several enhancements that can improve the application's security, scalability, and maintainability. Below are some areas for improvement:

#### 1. Implement Authentication with Passport.js
Why: Integrating Passport.js with NestJS provides a modular and standardized way to handle authentication, supporting various strategies and simplifying the process of securing endpoints.
Suggestion:
Install necessary packages
 ```bash
 cd nest-backend
npm install @nestjs/passport passport passport-local
```

Create an AuthModule and implement a LocalStrategy:
 ```code
// auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return user;
  }
}
```

#### 2. Secure Password Handling
Why: Storing passwords in plain text is a significant security risk. Hashing passwords using a reliable algorithm like bcrypt ensures that passwords are not exposed in case of a data breach.
Suggestion:
Install bcrypt:
 ```bash
npm install bcrypt
```
Hash passwords before saving to the database:
 ```code
import * as bcrypt from 'bcrypt';

// In the user service or before saving the user
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(user.password, saltRounds);
user.password = hashedPassword;
```

#### 3. Token Management with JWT
Why: JSON Web Tokens (JWT) provide a secure way to transmit information between parties and are widely used for stateless authentication, reducing server load and simplifying session management.
Suggestion:
Install JWT packages:
 ```bash
npm install @nestjs/jwt passport-jwt
```

 ```code
// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret', // Replace with environment variable in production
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

#### 4. Create an AuthGuard
Why: Implementing an AuthGuard provides a centralized way to handle authorization in NestJS applications. It allows you to protect routes and ensure that only authenticated users can access certain endpoints.
Suggestion:
- Create a custom AuthGuard using the JWT strategy:
 ```code
 // auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Add custom authentication logic here if needed
    return super.canActivate(context);
  }
}
 ```
- Use the AuthGuard to protect routes:
 ```code
// example.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('example')
export class ExampleController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }
}
 ```

#### 5. Implement Rate Limiting
Why: Rate limiting protects the application from abuse and denial-of-service attacks by limiting the number of requests a client can make within a certain time frame.
Suggestion:
- Install rate limiting middleware:
 ```bash
npm install express-rate-limit
 ```
- Apply rate limiting to the application:
 ```typescript
// main.ts
import * as rateLimit from 'express-rate-limit';

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
  }),
);
 ```

#### 6. Standardize API Response Structure
Why: A consistent API response format enhances the client-side handling of responses and makes the API easier to consume and debug.
Suggestion:
- Define a standard response interface:
 ```typescript
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}
 ```
 - Use the response format in controllers:
 ```typescript
// Example in a controller method
@Get('users')
async getUsers(): Promise<ApiResponse<User[]>> {
  const users = await this.userService.findAll();
  return {
    success: true,
    data: users,
  };
}
 ```
 
