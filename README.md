# The Grand Plate - Digital Menu

A modern, responsive digital menu application for restaurants and cafes. Built with Next.js, TypeScript, and Supabase.

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
- Supabase
- React Icons
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

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

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
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

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
