# SkillsCheck

> **Work in Progress:** This project is actively being developed by two frontend developers.

**SkillsCheck** is a web application designed to test and certify frontend development skills. Users can take quizzes on React, TypeScript, and other technologies, save their results, and download a certificate.

## Technology Stack

* **Next.js 15.3.4** (App Router, TypeScript)
* **Tailwind CSS + DaisyUI** for styling and UI utilities
* **GraphQL** with **GraphQL Yoga** as the server implementation
* **Apollo Client** for querying and mutating data on the client side
* **Prisma** ORM with **PostgreSQL** database
* **JWT** (`jsonwebtoken`) + **bcryptjs** for authentication and password hashing
* **Docker Compose** for local PostgreSQL (optional)
* **GitHub Actions** for CI/CD: linting, type checks, build, and database migrations

## Getting Started

### Prerequisites

* Node.js v18+ and npm v8+
* Docker (optional) or a local PostgreSQL installation

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/skills-check.git
   cd skills-check
   ```

2. **Create environment variables**
   Copy the example and fill in your own values:

   ```bash
   cp .env.example .env
   ```

   Update `.env`:

   ```dotenv
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   POSTGRES_DB=
   POSTGRES_PORT=

   DATABASE_URL=
   JWT_SECRET=
   PORT=
   ```

3. **Start the database** (with Docker Compose)

   ```bash
   docker compose up -d
   ```

   > **Note:** If Docker is not available, install PostgreSQL locally and adjust your `DATABASE_URL` accordingly.

4. **Run database migrations and generate Prisma Client**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Install dependencies and start the development server**

   ```bash
   npm install
   npm run dev
   ```

## Project Structure

```
skills-check/
├── README.md                 # Project overview and setup instructions
├── .env.example              # Example environment variables template
├── package.json              # NPM scripts and dependencies
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── prisma/                   # Prisma schema and migrations
├── graphql/                  # GraphQL SDL and resolvers
├── app/                      # Next.js App Router pages and layouts
│   ├── layout.tsx            # Root layout component
│   ├── api/graphql/route.ts  # GraphQL endpoint handler
│   ├── login/page.tsx        # Login page
│   ├── register/             # Registration form components
│   └── tests/[id]/page.tsx   # Dynamic test page
├── components/               # Reusable UI components
├── hooks/                    # Custom React hooks (useForm, useTimer)
├── lib/                      # Shared utilities (Apollo Client, validators)
└── .github/                  # GitHub Actions workflows
```

## Contributors

* **Karina** — frontend architecture and component design, GraphQL server, database schema, and CI/CD
* **Olena** — frontend architecture and component design


---

© 2025 SkillsCheck Team
