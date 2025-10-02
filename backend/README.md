# Flex Living Reviews Dashboard - Backend

A Node.js/Express API server for managing property reviews with Hostaway integration and data normalization.

## 🎯 Overview

The backend provides a RESTful API for the Flex Living Reviews Dashboard, handling review data from Hostaway API, data normalization, and review management operations.

## 🏗️ Architecture

### Technology Stack
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe development
- **Axios**: HTTP client for external APIs
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Project Structure
```
backend/src/
├── controllers/         # API route handlers
│   └── reviewsController.ts
├── services/           # Business logic services
│   └── hostawayService.ts
├── types/             # TypeScript definitions
│   └── hostaway.ts
├── index.ts           # Server entry point
└── dist/              # Compiled JavaScript (build output)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd backend
npm install
```

### Development
```bash
npm run dev
```
Starts server with hot reload on http://localhost:3001

### Production Build
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=3001
HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152
HOSTAWAY_ACCOUNT_ID=61148
GOOGLE_PLACES_API_KEY=your_google_api_key_here
NODE_ENV=development
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 📡 API Endpoints

### Reviews

#### GET /api/reviews/hostaway
Fetches reviews from Hostaway API with fallback to mock data.

**Query Parameters:**
- `listingId` (optional): Filter by specific listing
- `limit` (optional): Number of reviews to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 7453,
      "type": "guest-to-host",
      "status": "published",
      "overallRating": 4.5,
      "publicReview": "Great stay!",
      "categories": {
        "cleanliness": 5,
        "communication": 4,
        "respect_house_rules": 5
      },
      "submittedAt": "2020-08-21T22:45:14.000Z",
      "guestName": "John Doe",
      "listingName": "2B N1 A - 29 Shoreditch Heights",
      "channel": "hostaway",
      "isApproved": false,
      "date": "2020-08-21T22:45:14.000Z"
    }
  ],
  "metadata": {
    "total": 1,
    "listings": ["2B N1 A - 29 Shoreditch Heights"],
    "channels": ["hostaway"]
  }
}
```

#### PATCH /api/reviews/:reviewId/approval
Updates review approval status for public display.

**Request Body:**
```json
{
  "isApproved": true
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Review approval updated successfully",
  "data": {
    "reviewId": 7453,
    "isApproved": true
  }
}
```

### Health Check

#### GET /api/health
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 🔌 Services

### HostawayService

The main service for handling Hostaway API integration and data normalization.

#### Methods

**fetchReviews()**
- Fetches reviews from Hostaway API
- Returns raw API response
- Handles API errors gracefully

**normalizeReviews(hostawayReviews)**
- Converts Hostaway review format to normalized format
- Calculates overall ratings from category ratings
- Standardizes data structure

**getMockReviews()**
- Returns mock review data for development/testing
- Provides realistic test data when API is unavailable

#### Data Normalization

The service normalizes Hostaway review data into a consistent format:

```typescript
interface NormalizedReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: 'published' | 'pending' | 'rejected';
  overallRating: number | null;
  publicReview: string;
  categories: {
    [key: string]: number | null;
    cleanliness: number | null;
    communication: number | null;
    respect_house_rules: number | null;
  };
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel: 'hostaway';
  isApproved: boolean;
  date: Date;
}
```

## 🛡️ Error Handling

### Error Types
- **API Errors**: Hostaway API failures
- **Validation Errors**: Invalid request data
- **Server Errors**: Internal server issues

### Error Response Format
```json
{
  "status": "error",
  "message": "Error description",
  "details": "Additional error information"
}
```

### Error Handling Strategy
1. **Try-Catch Blocks**: Wrap all async operations
2. **API Fallback**: Use mock data when API fails
3. **Logging**: Console logging for debugging
4. **Graceful Degradation**: Return partial data when possible

## 🔒 Security

### Security Measures
- **CORS**: Configured for frontend domain
- **Input Validation**: TypeScript type checking
- **Error Sanitization**: No sensitive data in error responses
- **Rate Limiting**: Consider implementing for production

### CORS Configuration
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## 📊 Data Processing

### Review Normalization Process

1. **Fetch Raw Data**: Get reviews from Hostaway API
2. **Calculate Overall Rating**: Average of category ratings
3. **Normalize Categories**: Standardize category structure
4. **Format Dates**: Convert to JavaScript Date objects
5. **Add Metadata**: Include channel and approval status

### Category Rating Calculation
```typescript
const overallRating = validRatings.length > 0 
  ? validRatings.reduce((sum, cat) => sum + cat.rating, 0) / validRatings.length
  : null;
```

## 🧪 Testing

### Test Structure
```
tests/
├── unit/              # Unit tests
│   ├── services/
│   └── controllers/
├── integration/       # Integration tests
└── fixtures/          # Test data
```

### Running Tests
```bash
npm test              # Run all tests
npm run test:unit     # Run unit tests
npm run test:integration # Run integration tests
```

### Test Coverage
- **Service Methods**: All service methods tested
- **API Endpoints**: All endpoints tested
- **Error Scenarios**: Error handling tested
- **Data Normalization**: Normalization logic tested

## 📈 Performance

### Optimization Strategies
- **Connection Pooling**: Reuse HTTP connections
- **Caching**: Consider Redis for API response caching
- **Compression**: Enable gzip compression
- **Rate Limiting**: Prevent API abuse

### Performance Monitoring
- **Response Times**: Monitor API response times
- **Memory Usage**: Track memory consumption
- **Error Rates**: Monitor error frequency
- **Throughput**: Track requests per second

## 🔄 Development Workflow

### Code Structure
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and external API calls
- **Types**: TypeScript type definitions
- **Utils**: Shared utility functions

### Development Best Practices
- **TypeScript**: Strict type checking enabled
- **Error Handling**: Comprehensive error handling
- **Logging**: Structured logging for debugging
- **Documentation**: JSDoc comments for functions

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
1. Set production environment variables
2. Configure reverse proxy (nginx)
3. Set up SSL certificates
4. Configure monitoring and logging

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3001
CMD ["npm", "start"]
```

## 📝 Logging

### Log Levels
- **Error**: System errors and exceptions
- **Warn**: Warning messages
- **Info**: General information
- **Debug**: Detailed debugging information

### Log Format
```typescript
console.log(`[${new Date().toISOString()}] ${level}: ${message}`);
```

## 🔧 Maintenance

### Dependency Updates
```bash
npm update
npm audit fix
```

### Code Quality
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Git Hooks**: Pre-commit checks

### Monitoring
- **Health Checks**: Regular health check monitoring
- **Error Tracking**: Error logging and alerting
- **Performance**: Response time monitoring
- **Uptime**: Service availability monitoring

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration
   - Verify frontend URL in CORS settings

2. **API Connection Issues**
   - Verify Hostaway API credentials
   - Check network connectivity
   - Review API rate limits

3. **TypeScript Compilation Errors**
   - Check type definitions
   - Verify import/export statements
   - Run type checking

4. **Port Already in Use**
   - Check if port 3001 is available
   - Kill existing processes
   - Change port in configuration

### Debug Mode
```bash
DEBUG=* npm run dev
```

---

**Backend Documentation - Flex Living Reviews Dashboard**
