# Flex Living Reviews Dashboard

A comprehensive reviews management system for Flex Living properties, featuring a modern dashboard for managers to analyze guest feedback and a public-facing property page to display approved reviews.

## 🏗️ Architecture

This project consists of two main components:
- **Frontend**: React + TypeScript + Vite application with Tailwind CSS
- **Backend**: Node.js + Express + TypeScript API server

## 📋 Features

### Manager Dashboard
- **Review Analytics**: Comprehensive statistics and charts showing review trends
- **Review Management**: Filter, sort, and approve/reject reviews for public display
- **Property Performance**: Per-property analysis with category breakdowns
- **Real-time Data**: Live updates from Hostaway API integration
- **Responsive Design**: Mobile-friendly interface

### Public Property Page
- **Review Display**: Showcase approved guest reviews
- **Property Details**: Complete property information with amenities
- **Modern UI**: Clean, professional design matching Flex Living branding

### API Integration
- **Hostaway Integration**: Real-time review data from Hostaway API
- **Google Reviews**: Exploration of Google Places API integration
- **Data Normalization**: Consistent data structure across all sources

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flex-living
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend environment variables
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Start backend server
   cd backend
   npm run dev

   # Terminal 2 - Start frontend development server
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Health Check: http://localhost:3001/api/health

## 📁 Project Structure

```
flex-living/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/    # API route handlers
│   │   ├── services/       # Business logic services
│   │   ├── types/          # TypeScript type definitions
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔧 Development

### Backend Development

The backend is built with Express.js and TypeScript, providing a RESTful API for review management.

**Available Scripts:**
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
```

### Frontend Development

The frontend is built with React, TypeScript, and Vite, featuring a modern component-based architecture.

**Available Scripts:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📊 API Documentation

### Endpoints

#### GET /api/reviews/hostaway
Fetches reviews from Hostaway API with fallback to mock data.

#### PATCH /api/reviews/:reviewId/approval
Updates review approval status for public display.

#### GET /api/health
Health check endpoint.

For detailed API documentation, see `backend/README.md`.

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **CORS**: cors middleware
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure environment variables are set
4. Configure reverse proxy (nginx recommended)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure API proxy settings for production

## 🔍 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)
```env
# Hostaway API Configuration
HOSTAWAY_API_KEY=
HOSTAWAY_ACCOUNT_ID=
HOSTAWAY_API_BASE=https://api.hostaway.com/v1

# Server Configuration
PORT=3001
NODE_ENV=development

# Google Places API (Optional)
GOOGLE_PLACES_API_KEY=your_google_api_key_here
```

**Security Note**: The `.env` file is gitignored for security. Copy `.env.example` to `.env` and customize as needed.

### Frontend (.env)
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# Application Configuration
VITE_APP_NAME=Flex Living Reviews Dashboard
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_GOOGLE_REVIEWS=false
VITE_ENABLE_ANALYTICS=false

# Development Configuration
VITE_DEBUG_MODE=true
```

**Note**: All frontend environment variables must be prefixed with `VITE_` to be accessible in the browser.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary to Flex Living.

## 🆘 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for Flex Living**