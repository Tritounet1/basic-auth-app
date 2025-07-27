# Basic Auth App

A simple app in nodejs for create a basic auth system.

## Stack

- nodejs
- typescript
- express
- jsonwebtoken
- prisma
- sqlite

## Prisma

Prisma is a ORM (Object-Relational Mapping) for Node.js and TypeScript that simplifies database access. 

In this project, Prisma is used to:

- **Automatically generate TypeScript client** to interact with the database
- **Manage database schema migrations**
- **Provide a type-safe interface** for SQL queries
- **Use SQLite** as the development database

### Configuration

The Prisma schema is located in `prisma/schema.prisma` and defines:
- A `User` model with `id`, `email` and `password`
- A SQLite database
- The generated client in the `generated/prisma` folder

## Useful Commands

### Development
```bash
# Start development server
npm run dev

# Build and start in production
npm start

# Compile TypeScript
npx tsc
```

### Prisma
```bash
# Generate Prisma client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (graphical interface with all the tables and data)
npx prisma studio

# Reset database
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

### Database
```bash
# Open SQLite database
sqlite3 prisma/dev.db

# Backup database
cp prisma/dev.db prisma/backup.db
```

### Installation and setup
```bash
# Install dependencies
npm install

# Install Prisma CLI globally
npm install -g prisma

# Initialize Prisma (already done)
npx prisma init
```

