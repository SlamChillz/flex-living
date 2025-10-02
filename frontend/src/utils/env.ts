import { config } from '../config';

/**
 * Environment utility functions
 */
export const env = {
  /**
   * Get environment variable with fallback
   */
  get: (key: string, fallback?: string): string => {
    return import.meta.env[key] || fallback || '';
  },

  /**
   * Get boolean environment variable
   */
  getBoolean: (key: string, fallback = false): boolean => {
    const value = import.meta.env[key];
    if (value === undefined) return fallback;
    return value === 'true' || value === '1';
  },

  /**
   * Get number environment variable
   */
  getNumber: (key: string, fallback = 0): number => {
    const value = import.meta.env[key];
    if (value === undefined) return fallback;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  },

  /**
   * Check if running in development mode
   */
  isDev: (): boolean => config.isDevelopment,

  /**
   * Check if running in production mode
   */
  isProd: (): boolean => config.isProduction,

  /**
   * Get API base URL
   */
  getApiUrl: (): string => config.api.baseUrl,

  /**
   * Get app name
   */
  getAppName: (): string => config.app.name,

  /**
   * Get app version
   */
  getAppVersion: (): string => config.app.version,

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled: (feature: keyof typeof config.features): boolean => {
    return config.features[feature];
  },

  /**
   * Get debug configuration
   */
  getDebugConfig: () => config.debug,
};

/**
 * Log environment configuration (only in development)
 */
export const logEnvConfig = (): void => {
  if (config.isDevelopment && config.debug.enabled) {
    console.group('🔧 Environment Configuration');
    console.log('API Base URL:', config.api.baseUrl);
    console.log('App Name:', config.app.name);
    console.log('App Version:', config.app.version);
    console.log('Features:', config.features);
    console.log('Debug Mode:', config.debug.enabled);
    console.groupEnd();
  }
};
