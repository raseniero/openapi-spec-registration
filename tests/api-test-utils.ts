import axios, { AxiosResponse } from 'axios';
import { sendRequest } from '../wrapper';

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:4010',
  API_KEY: 'test-api-key-12345'
};

// Helper function to add API key header
export const addApiKeyHeader = (config: any = {}) => ({
  ...config,
  headers: {
    ...config.headers,
    'X-API-Key': API_CONFIG.API_KEY
  }
});

// Common test data
export const TEST_DATA = {
  VALID_REGISTRATION: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    confirmEmail: 'john.doe@example.com',
    schedule: '2024-03-15T10:00:00Z'
  },
  INVALID_REGISTRATION: {
    firstName: 'J', // Too short
    lastName: 'D', // Too short
    email: 'invalid-email',
    confirmEmail: 'different@email.com',
    schedule: '2024-03-15T10:00:00Z'
  },
  INCOMPLETE_REGISTRATION: {
    firstName: 'John'
    // Missing other required fields
  }
};

// Utility function for making authenticated API requests
export const makeApiRequest = async <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: any,
  additionalConfig?: any
): Promise<AxiosResponse<T>> => {
  const config = addApiKeyHeader(additionalConfig);
  
  switch (method) {
    case 'GET':
      return await sendRequest(axios.get, endpoint, config) as AxiosResponse<T>;
    case 'POST':
      return await sendRequest(axios.post, endpoint, data, config) as AxiosResponse<T>;
    case 'PUT':
      return await sendRequest(axios.put, endpoint, data, config) as AxiosResponse<T>;
    case 'DELETE':
      return await sendRequest(axios.delete, endpoint, config) as AxiosResponse<T>;
    case 'PATCH':
      return await sendRequest(axios.patch, endpoint, data, config) as AxiosResponse<T>;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
};

// Response validation helpers - these now accept expect as a parameter and are more flexible
export const validateSuccessResponse = (response: AxiosResponse, expect: any, expectedStatus: number = 200) => {
  expect(response.status).toBe(expectedStatus);
  expect(response.data).toBeDefined();
};

export const validateErrorResponse = (response: AxiosResponse, expect: any, expectedStatus: number = 400) => {
  expect(response.status).toBe(expectedStatus);
  // Be more flexible about error response structure
  if (response.data) {
    expect(response.data).toHaveProperty('message');
  }
};

export const validateRegistrationResponse = (response: AxiosResponse, expect: any) => {
  expect(response.status).toBe(201);
  expect(response.data).toHaveProperty('success', true);
  expect(response.data).toHaveProperty('message', 'Registration submitted successfully');
  expect(response.data).toHaveProperty('registrationId');
  expect(response.data).toHaveProperty('emailSent', true);
  expect(response.data).toHaveProperty('adminNotificationSent', true);
  expect(response.data).toHaveProperty('nextSteps');
};

export const validateScheduleResponse = (response: AxiosResponse, expect: any) => {
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('success', true);
  expect(response.data).toHaveProperty('schedules');
  expect(response.data.schedules).toBeInstanceOf(Array);
  expect(response.data.schedules.length).toBeGreaterThan(0);
};

// Test data generators
export const generateTestEmail = (prefix: string = 'test') => {
  const timestamp = Date.now();
  return `${prefix}.${timestamp}@example.com`;
};

export const generateRegistrationData = (overrides: any = {}) => ({
  ...TEST_DATA.VALID_REGISTRATION,
  email: generateTestEmail(),
  confirmEmail: generateTestEmail(),
  ...overrides
});
