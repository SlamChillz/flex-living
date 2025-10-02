# Flex Living Reviews Dashboard - Frontend

A modern React-based frontend application for managing and displaying property reviews.

## 🎯 Overview

The frontend is a single-page application built with React 18, TypeScript, and Vite, providing an intuitive interface for property managers to analyze guest reviews and for visitors to view approved reviews on property pages.

## 🏗️ Architecture

### Technology Stack
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and caching
- **Chart.js**: Data visualization
- **Axios**: HTTP client

### Project Structure
```
frontend/src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── FilterBar.tsx    # Review filtering interface
│   ├── ReviewList.tsx   # Review listing component
│   ├── StatsOverview.tsx # Statistics overview
│   ├── PropertyPage.tsx # Public property page
│   └── charts/          # Chart components
├── services/            # API service layer
│   └── api.ts          # API client
├── types/              # TypeScript definitions
│   └── review.ts       # Review-related types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```
Opens http://localhost:3000

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Components

### Dashboard Component
The main dashboard provides comprehensive review management capabilities.

**Features:**
- Review statistics overview
- Interactive charts and visualizations
- Review filtering and sorting
- Approval/rejection controls
- Responsive design

**Key Props:**
```typescript
interface DashboardProps {
  // Component manages its own state via React Query
}
```

### ReviewList Component
Displays a paginated list of reviews with management controls.

**Features:**
- Pagination
- Sorting by date, rating, property
- Filtering by status, channel, rating
- Bulk actions
- Individual review management

**Props:**
```typescript
interface ReviewListProps {
  reviews: NormalizedReview[];
  onApprove: (reviewId: number) => void;
  onReject: (reviewId: number) => void;
  loading?: boolean;
}
```

### StatsOverview Component
Shows key metrics and statistics about reviews.

**Features:**
- Total review count
- Average rating
- Rating distribution
- Category breakdowns
- Trend indicators

### Chart Components
Multiple chart components for data visualization:

- **ReviewDistributionChart**: Bar chart showing rating distribution
- **CategoryBreakdownChart**: Radar chart for category ratings
- **RatingTrendsChart**: Line chart showing rating trends over time

### PropertyPage Component
Public-facing property page displaying approved reviews.

**Features:**
- Property information display
- Approved reviews showcase
- Responsive layout
- SEO-friendly structure

## 🔧 Configuration

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@types': resolve(__dirname, './src/types'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
})
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... more color variants
        }
      }
    }
  },
  plugins: []
}
```

## 📊 Data Management

### React Query Setup
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
```

### API Service
The `api.ts` service handles all backend communication:

```typescript
// services/api.ts
export const api = {
  getReviews: () => axios.get('/api/reviews/hostaway'),
  updateReviewApproval: (reviewId: number, isApproved: boolean) =>
    axios.patch(`/api/reviews/${reviewId}/approval`, { isApproved }),
}
```

## 🎨 Styling

### Tailwind CSS
The application uses Tailwind CSS for styling with a custom design system:

- **Colors**: Primary blue palette with secondary grays
- **Typography**: System font stack with proper hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component classes

### Custom Styles
```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
```

## 🔄 State Management

### React Query
- **Data Fetching**: Automatic caching and background updates
- **Error Handling**: Built-in error states and retry logic
- **Loading States**: Loading indicators and skeleton screens
- **Optimistic Updates**: Immediate UI updates with rollback

### Local State
- **Component State**: useState for local UI state
- **Form State**: Controlled components for form inputs
- **Filter State**: URL parameters for filter persistence

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Touch-friendly interface
- Swipe gestures for navigation
- Optimized chart sizes
- Collapsible sidebar

## 🧪 Testing

### Test Setup
```bash
npm test
```

### Test Structure
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Full user journey testing

## 🚀 Performance

### Optimization Strategies
- **Code Splitting**: Lazy loading of components
- **Bundle Analysis**: Webpack bundle analyzer
- **Image Optimization**: Optimized images and lazy loading
- **Caching**: React Query caching and HTTP caching

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

### Security Measures
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Input Validation**: Client-side validation with TypeScript
- **Secure Headers**: Security headers via Vite configuration

## 📦 Build & Deployment

### Build Process
1. TypeScript compilation
2. Vite bundling and optimization
3. Asset optimization
4. Static file generation

### Environment Variables

The frontend uses environment variables for configuration. Create a `.env` file in the frontend directory:

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

**Important**: All frontend environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Deployment
- **Static Hosting**: Deploy `dist` folder to any static host
- **CDN**: Configure CDN for global distribution
- **Environment Variables**: Set production API endpoints

## 🐛 Debugging

### Development Tools
- **React DevTools**: Component inspection
- **Redux DevTools**: State inspection (if using Redux)
- **Network Tab**: API request debugging
- **Console Logging**: Strategic console.log statements

### Common Issues
1. **CORS Errors**: Check backend CORS configuration
2. **API Timeouts**: Verify backend server is running
3. **Build Errors**: Check TypeScript compilation
4. **Styling Issues**: Verify Tailwind CSS compilation

## 📈 Analytics

### User Analytics
- **Page Views**: Track component usage
- **User Interactions**: Button clicks and form submissions
- **Performance Metrics**: Core Web Vitals tracking

### Error Tracking
- **Error Boundaries**: React error boundaries for graceful error handling
- **Console Errors**: Log and track JavaScript errors
- **API Errors**: Track and monitor API failures

## 🔄 Updates & Maintenance

### Dependency Updates
```bash
npm update
npm audit fix
```

### Code Maintenance
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **TypeScript**: Type safety and refactoring
- **Git Hooks**: Pre-commit linting and testing

---

**Frontend Documentation - Flex Living Reviews Dashboard**
