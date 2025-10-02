export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 10000,
  },
  
  // Application Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Flex Living Reviews Dashboard',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  
  // Feature Flags
  features: {
    enableGoogleReviews: import.meta.env.VITE_ENABLE_GOOGLE_REVIEWS === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  
  // Development Configuration
  debug: {
    enabled: import.meta.env.VITE_DEBUG_MODE === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
  },
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Type definitions for environment variables
export interface EnvConfig {
  VITE_API_BASE_URL?: string;
  VITE_APP_NAME?: string;
  VITE_APP_VERSION?: string;
  VITE_ENABLE_GOOGLE_REVIEWS?: string;
  VITE_ENABLE_ANALYTICS?: string;
  VITE_DEBUG_MODE?: string;
  VITE_LOG_LEVEL?: string;
}

// Validation function to check required environment variables
export const validateEnv = (): void => {
  const requiredVars = ['VITE_API_BASE_URL'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Initialize validation in development
if (config.isDevelopment) {
  validateEnv();
}
