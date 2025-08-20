# QRunch - Digital Menu

A modern, responsive digital menu application for restaurants and cafes. Built with Next.js, TypeScript, and Neon DB with NextAuth for authentication.

## Features

- 📱 Responsive design for all devices
- 🔍 Search and filter functionality
- 🎨 Beautiful UI with custom animations
- 📊 Real-time menu updates
- 🔒 Admin dashboard for menu management
- 🌐 Progressive Web App support

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Neon DB (PostgreSQL)
- NextAuth.js
- React Icons
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon DB account (or any PostgreSQL database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/the-grand-plate.git
cd the-grand-plate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your database credentials:
```env
DATABASE_URL=your_neon_db_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_secret_here
```

4. Initialize the database:
```bash
npm run db:init
# or
yarn db:init
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel's dashboard
4. Deploy!

## Environment Variables

Required environment variables:

- `DATABASE_URL`: Your Neon DB connection string
- `NEXTAUTH_URL`: Your application URL (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET`: A secure random string for session encryption

## Database Setup

1. Create a new database in Neon DB (https://neon.tech/)
2. Run the initialization script to create the required tables:
   ```bash
   npm run db:init
   ```
3. The script will create all necessary tables and indexes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
