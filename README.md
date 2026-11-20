# Engenious University — automated login test

Automated test for the login flow on https://university.engenious.io (QA Engineer assessment, Task 2).

Stack: Playwright + TypeScript, Google Chrome only.

## What the test does

`tests/login.spec.ts` — **TC-01: registered user logs in with valid email and password**

1. Opens the home page.
2. Clicks "Sign Up / Login", then the "Login" tab.
3. Enters email and password from `.env`.
4. Clicks "Login".
5. Checks that the user is logged in: the URL is no longer `/login`, the "Sign Up / Login" button is gone, and the side menu shows the "Logout" button and the profile link.

Note: the assessment says "Sign In" → "Log in". The current UI has one "Sign Up / Login" button and a "Login" tab, so the test follows the current UI.

## Requirements

- Node.js 18 or newer
- Google Chrome installed
- A registered test account on Engenious University

## Setup

```bash
npm install
cp .env.example .env
```

Open `.env` and add the test account:

```
TEST_USER_EMAIL=your-test-email
TEST_USER_PASSWORD=your-test-password
```

`.env` is in `.gitignore`, so credentials are never committed.

## Run

```bash
npm test              # headless
npm run test:headed   # with the browser window visible
npm run report        # open the HTML report
npm run typecheck     # TypeScript check
```

On failure, Playwright saves a screenshot and a trace in `test-results/`.

## Project structure

```
pages/
  LoginPage.ts       Page Object: home page button, login tab, form, login()
  DashboardPage.ts   Page Object: elements after login
tests/
  login.spec.ts      TC-01 login test
playwright.config.ts Chrome-only project, base URL, reports
.env.example         Template for test credentials
```

## Design decisions

- **Page Object Model** keeps locators in one place. The test reads like the test case steps.
- **User-facing locators** (`getByRole`, `getByLabel`, `getByText`) instead of CSS/XPath. They are more stable and also check basic accessibility.
- **No fixed waits.** Playwright waits for elements automatically; `expect` assertions retry until the timeout.
- **`test.step`** groups actions, so the report shows the same steps as the manual test case.
- **Credentials in `.env`**, not in code.
- **Cookie dialog handler.** A new browser session always shows the cookie consent dialog. `page.addLocatorHandler()` closes it ("Essential only") whenever it blocks the test, so the test does not depend on when the dialog appears.

## How AI was used

<!-- Edit this section so it describes what you actually did. -->
I used Claude as an assistant to set up the project structure and write the first version of the Page Objects and the test. I checked every locator against the live page in Chrome DevTools, ran the test locally and reviewed the code myself.
