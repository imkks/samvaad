Chat App
This is a chat application built using React, NestJS, PostgreSQL and JWT authentication. It allows for both private and group chat, the creation of new chat rooms, and message persistence.

Installation
Prerequisites
Node.js (version 12 or later)
PostgreSQL (version 12 or later)
Installation Steps
Clone the repository

bash
Copy code
git clone <repository-url>
Install dependencies

bash
Copy code
cd client && npm install
cd ../server && npm install
Set up environment variables

Create a .env file in the server directory with the following variables:

makefile
Copy code
PORT=<port-number>
DATABASE_URL=<postgres-database-url>
JWT_SECRET=<jwt-secret-key>
Run the server

arduino
Copy code
cd server && npm run start:dev
Run the client

bash
Copy code
cd client && npm start
Open the app in your browser

arduino
Copy code
http://localhost:3000
Usage
Authentication
Users can sign up or log in to the application using JWT authentication. When a user logs in, a token is generated and stored in local storage. This token is used to authenticate requests to the server.

Chat
Once authenticated, users can create new chat rooms or join existing ones. Users can participate in group chat or private chat with other users. Messages are persisted in the database, so users can access their chat history.

Technologies Used
React
NestJS
PostgreSQL
JWT authentication
Socket.IO
License
This project is licensed under the MIT License - see the LICENSE file for details.