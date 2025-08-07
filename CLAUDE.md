# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive testing framework for a Class Registration System that combines:
- Playwright for browser automation and UI testing
- Custom utilities for API testing against OpenAPI specifications
- Type-safe response validation with debugging capabilities

## Essential Commands

### Testing
```bash
# Run all tests
npm test
# or
npx playwright test

# Run tests with browser UI visible
npm run test:headed

# Debug tests interactively
npm run test:debug

# Open Playwright UI for interactive testing
npm run test:ui

# View test reports
npm run report

# Run a specific test file
npx playwright test tests/registration-api.spec.ts

# Run tests in a specific browser
npx playwright test --project=chromium
```

### Mock Server (Prism)
```bash
# Start mock server with OpenAPI spec
npm run mock:start

# Start with dynamic responses
npm run mock:start:dynamic

# Validate OpenAPI specification
npm run mock:validate

# Start on specific port (3001)
npm run mock:start:port
```

### Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run install-browsers
```

## Architecture & Code Structure

### Testing Architecture
The project uses a layered testing approach:

1. **API Testing Layer** (`/tests/*-api.spec.ts`)
   - Tests against OpenAPI specification at `api-docs/openapi.yaml`
   - Uses mock server (Prism) on port 4010 by default
   - Test files: `registration-api.spec.ts`, `schedule-api.spec.ts`, `validation-api.spec.ts`

2. **Utility Layer**
   - `wrapper.ts`: Request wrapper with automatic logging and cURL generation
   - `curlHelper.ts`: Converts Axios requests to cURL commands for debugging
   - `responseAsserts.ts`: Type-safe response validation helpers
   - `tests/api-test-utils.ts`: Common test data and API configuration

3. **UI Testing Layer** (`/tests-examples/`)
   - Example Playwright tests for UI automation
   - Uses Page Object patterns and helper functions

### Key Configuration Points

**API Base URL**: `http://127.0.0.1:4010` (configured in `tests/api-test-utils.ts`)
**API Key Header**: `X-API-Key: test-api-key-12345`
**Mock Server Port**: 4010 (default Prism port)
**Test Directory**: `./tests`
**Browser Projects**: Chromium, Firefox, WebKit

### OpenAPI Integration
The system is built around the OpenAPI specification at `api-docs/openapi.yaml` which defines:
- `/registration` - POST endpoint for class registration submission
- `/validation/*` - Form validation endpoints
- `/schedule/*` - Available time slots endpoints

The specification includes comprehensive request/response schemas, error handling (400, 409, 500 status codes), and examples.

### Testing Patterns

When writing API tests:
1. Import utilities from `api-test-utils.ts` for common configuration
2. Use `sendRequest` wrapper from `wrapper.ts` for automatic logging
3. Use `addApiKeyHeader` helper to add authentication
4. Reference `TEST_DATA` for common test payloads

Example pattern:
```typescript
import { sendRequest } from '../wrapper';
import { API_CONFIG, addApiKeyHeader, TEST_DATA } from './api-test-utils';

const response = await sendRequest(
  axios.post,
  `${API_CONFIG.BASE_URL}/registration`,
  TEST_DATA.VALID_REGISTRATION,
  addApiKeyHeader()
);
```

### Development Workflow
1. Start the mock server: `npm run mock:start`
2. Run tests: `npm test`
3. Debug failures: Check generated cURL commands in console output
4. View reports: `npm run report`