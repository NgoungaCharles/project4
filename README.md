# QNLP - Natural Language to SQL Query Generator

QNLP is a powerful tool that transforms natural language queries into SQL, making database interactions more intuitive and accessible.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd qnlp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```bash
   # Create a new PostgreSQL database
   createdb qnlp_db

   # Import the schema and sample data
   psql -d qnlp_db -f server/db/schema.sql
   ```

4. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Update the .env file with your database credentials and JWT secret
   ```

5. **Start the Backend Server**
   ```bash
   # Start in development mode
   npm run server
   ```

6. **Start the Frontend Development Server**
   ```bash
   # In a new terminal
   npm run dev
   ```

## Project Structure

```
qnlp/
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   └── types/           # TypeScript type definitions
├── server/              # Backend source code
│   ├── db/              # Database configuration and schemas
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   └── types/           # Backend type definitions
└── public/              # Static assets
```

## Features

- Natural language query processing
- Real-time query suggestions
- Secure authentication
- Interactive query results
- PostgreSQL integration
- Error handling and validation

## Security Considerations

1. **Database Security**
   - Use connection pooling
   - Implement query parameterization
   - Restrict database user permissions

2. **API Security**
   - JWT-based authentication
   - Input validation
   - Rate limiting
   - CORS protection

## Common Issues and Solutions

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists and is accessible

2. **Authentication Problems**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear browser cache if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License