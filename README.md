# OpenAPI Spec Registration

A comprehensive testing framework that combines Playwright for browser automation with custom utilities for API testing against OpenAPI specifications, specifically designed for testing a **Class Registration System**.

## 🎯 Project Overview

This project provides a robust foundation for testing both web applications and APIs with:

- **Playwright** for browser automation and UI testing
- **Custom utilities** for API testing and debugging
- **Type-safe** response validation
- **Built-in debugging** with cURL command generation
- **OpenAPI specification** integration ready
- **Class Registration System** testing focus

## 📁 Project Structure

```bash
openapi-spec-registration/
├── tests/                    # Test files
│   └── demo-todo-app.spec.ts # Example TodoMVC test suite
├── tests-examples/           # Example test files
│   └── demo-todo-app.spec.ts # TodoMVC example test suite
├── api-docs/                 # OpenAPI documentation
│   └── openapi.yaml         # Class registration API spec
├── ai-docs/                  # AI-generated documentation
│   ├── user-story.md        # User stories for registration form
│   ├── user-flow.md         # User flow documentation
│   └── prd-registration-form.md # Product requirements
├── playwright.config.ts      # Playwright configuration
├── package.json             # Dependencies and scripts
├── curlHelper.ts            # API debugging utilities
├── responseAsserts.ts       # Type-safe response validation
└── wrapper.ts               # Request wrapper with logging
```

## 🎯 Business Domain

### Class Registration System

The project is specifically designed for testing a **digital class registration system** with comprehensive user stories and API specifications.

#### Key User Stories

- **Successful Registration**: Complete form submission with email confirmation
- **Form Validation**: Email format, required fields, email matching
- **Schedule Selection**: Dropdown with available time slots
- **Duplicate Prevention**: Prevent multiple registrations with same email
- **Responsive Design**: Mobile-friendly interface

#### API Endpoints

- **POST /registration**: Submit class registration
- **Validation endpoints**: Form field validation
- **Schedule endpoints**: Available time slots
- **Error handling**: 400, 409, 500 status codes
- **Email notifications**: Confirmation and admin notifications

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/raseniero/open-api-playwright.git
cd open-api-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests with debug mode
npx playwright test --debug
```

## 🛠️ Core Components

### 1. API Testing Utilities

#### `curlHelper.ts`

Converts Axios requests to cURL commands for debugging:

```typescript
import { CurlHelper } from './curlHelper';

const config = {
  method: 'POST',
  url: 'https://api.example.com/users',
  headers: { 'Content-Type': 'application/json' },
  data: { name: 'John Doe' }
};

const curl = new CurlHelper(config);
console.log(curl.generateCommand());
// Output: curl -X POST -H "Content-Type:application/json" --data '{"name":"John Doe"}' "https://api.example.com/users"
```

#### `responseAsserts.ts`

Type-safe assertion utilities for API responses:

```typescript
import { isAxiosResponse, isAxiosErrorResponse } from './responseAsserts';

// Validate successful responses
try {
  const response = await axios.get('/api/users');
  isAxiosResponse(response);
  // response is now typed as AxiosResponse
} catch (error) {
  isAxiosErrorResponse(error);
  // error is now typed as AxiosError with response
}
```

#### `wrapper.ts`

Request wrapper with automatic logging:

```typescript
import { sendRequest } from './wrapper';

// Wraps API calls with logging and error handling
const response = await sendRequest(axios.get, '/api/users');
// Automatically logs cURL command and response
```

### 2. Playwright Configuration

The project is configured for:

- **Multi-browser testing** (Chrome, Firefox, Safari)
- **Parallel test execution**
- **HTML reporting**
- **CI/CD optimizations**
- **Mobile viewport support** (commented out)

### 3. Example Test Suite

The `demo-todo-app.spec.ts` demonstrates:

- **Page Object patterns**
- **Helper functions** for common operations
- **Local storage validation**
- **Cross-browser compatibility**
- **Comprehensive UI testing**

## 📋 Available Scripts

The project includes convenient npm scripts for common testing tasks:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report",
    "install-browsers": "playwright install"
  }
}
```

### Quick Commands

```bash
# Run all tests
npm test

# Run tests with browser UI visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Open Playwright UI for interactive testing
npm run test:ui

# View test reports
npm run report

# Install Playwright browsers
npm run install-browsers
```

## 🔧 Configuration

### Playwright Configuration

The `playwright.config.ts` includes:

- Test directory: `./tests`
- Parallel execution enabled
- HTML reporter
- Trace collection on retry
- Multi-browser projects

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
# API Configuration
API_BASE_URL=https://api.example.com
API_KEY=your-api-key

# Test Configuration
HEADLESS=false
SLOW_MO=1000
```

## 🧪 Writing Tests

### UI Testing Example

```typescript
import { test, expect } from '@playwright/test';

test('should add todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Buy groceries');
  await newTodo.press('Enter');
  
  await expect(page.getByTestId('todo-title')).toHaveText(['Buy groceries']);
});
```

### API Testing Example

```typescript
import { test, expect } from '@playwright/test';
import { sendRequest } from '../wrapper';
import axios from 'axios';

test('should create user', async () => {
  const response = await sendRequest(
    axios.post,
    '/api/users',
    { name: 'John Doe', email: 'john@example.com' }
  );
  
  expect(response.status).toBe(201);
  expect(response.data).toHaveProperty('id');
});
```

## 🔍 Debugging

### Viewing Test Reports

```bash
# Generate HTML report
npx playwright test --reporter=html

# Open the report
npx playwright show-report
```

### Debug Mode

```bash
# Run tests with debug mode
npx playwright test --debug

# Run specific test in debug mode
npx playwright test demo-todo-app.spec.ts --debug
```

### API Request Debugging

The `sendRequest` wrapper automatically logs:

- cURL commands for reproduction
- Request/response data
- Error details with status codes

## 🎯 Key Features

### 1. API Testing Capabilities

- **cURL command generation** for debugging
- **Type-safe response validation**
- **Automatic request/response logging**
- **Error handling with detailed information**

### 2. UI Testing Capabilities

- **Multi-browser support** (Chrome, Firefox, Safari)
- **Page Object Model** implementation
- **Local storage validation**
- **Responsive design testing**

### 3. Development Experience

- **TypeScript support** throughout
- **Comprehensive documentation**
- **Example test suites**
- **Debugging utilities**

## 📦 Dependencies & Technology Stack

### Core Dependencies

- **`@playwright/test`**: Browser automation and UI testing
- **`axios`**: HTTP client for API testing
- **`@types/node`**: TypeScript definitions for Node.js

### Testing Framework

- **Playwright**: Modern browser automation
- **TypeScript**: Type-safe development
- **Custom utilities**: API testing helpers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:

- Create an issue on GitHub
- Check the Playwright documentation
- Review the example test suite

---

Built with ❤️ using Playwright and TypeScript
