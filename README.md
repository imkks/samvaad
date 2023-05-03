Sure, here's a sample README.md file for your chat app:

# Chat App

This is a chat application built using React, NestJS, PostgreSQL and JWT authentication. It allows for both private and group chat, the creation of new chat rooms, and message persistence.

## Installation

### Prerequisites

- Node.js (version 12 or later)
- PostgreSQL (version 12 or later)

### Installation Steps

1. Clone the repository

   ```
   git clone <repository-url>
   ```

2. Install dependencies

   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables

   Create a `.env` file in the `server` directory with the following variables:

   ```
   PORT=<port-number>
   DATABASE_URL=<postgres-database-url>
   JWT_SECRET=<jwt-secret-key>
   ```

4. Run the server

   ```
   cd server && npm run start:dev
   ```

5. Run the client

   ```
   cd client && npm start
   ```

6. Open the app in your browser

   ```
   http://localhost:3000
   ```

## Usage

### Authentication

Users can sign up or log in to the application using JWT authentication. When a user logs in, a token is generated and stored in local storage. This token is used to authenticate requests to the server.

### Chat

Once authenticated, users can create new chat rooms or join existing ones. Users can participate in group chat or private chat with other users. Messages are persisted in the database, so users can access their chat history.

## Technologies Used

- React
- NestJS
- PostgreSQL
- JWT authentication
- Socket.IO

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
