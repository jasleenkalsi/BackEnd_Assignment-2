# Debugging Analysis

## Scenario 1: Environment Variable Management

- **Breakpoint Location:** `server.ts`, Line 38
- **Objective:** Ensure that environment variables are correctly loaded from the `.env` file.

### Debugger Observations

- **Variable States:**
  - `PORT = 3003` (Loaded correctly)
  - `process.env.FIREBASE_API_KEY = undefined` (Initial issue found)
- **Call Stack:**
  - `server.ts -> app.listen() -> console.log()`
- **Behavior:**
  - Initially, `FIREBASE_API_KEY` was `undefined`, meaning the `.env` file was not loading.
  - After adding `dotenv.config()`, the environment variable was correctly loaded.

### Analysis

- **What did you learn?**
  - Environment variables must be loaded at the **top** of `server.ts` using `dotenv.config()`.
- **Unexpected behavior?**
  - `.env` file was missing or not properly loaded.
- **Improvements?**
  - Ensure `.env` file exists and is included in `.gitignore`.
- **Enhanced understanding?**
  - This debugging scenario reinforced the importance of environment management for secure API credentials.

---

## Scenario 2: CORS Configuration Debugging

- **Breakpoint Location:** `server.ts`, Line 25
- **Objective:** Ensure that CORS (Cross-Origin Resource Sharing) is correctly restricting API access to allowed domains.

### Debugger Observations

- **Variable States:**
  - `origin = ["https://your-frontend.com"]` (Configured CORS policy)
- **Call Stack:**
  - `server.ts -> app.use(cors()) -> middleware execution`
- **Behavior:**
  - When sending a request from `https://unauthorized.com`, it was **blocked** (Expected ✅).
  - When sending a request from `https://your-frontend.com`, it **passed** (Expected ✅).

### Analysis

- **What did you learn?**
  - CORS settings should be explicitly defined to prevent unauthorized requests.
- **Unexpected behavior?**
  - None, everything worked as expected.
- **Improvements?**
  - If necessary, allow multiple trusted domains by modifying `origin`.
- **Enhanced understanding?**
  - Learned how CORS middleware controls access and prevents security vulnerabilities.

---

## Scenario 3: API Response Debugging

- **Breakpoint Location:** `branchRoutes.ts`, Line 10
- **Objective:** Ensure API responses return the expected data.

### Debugger Observations

- **Variable States:**
  - `branches = undefined` (Initial issue found)
  - `branches = [{ id: "123", name: "Main Branch" }]` (Fixed after debugging)
- **Call Stack:**
  - `branchRoutes.ts -> getAllBranches() -> database query execution`
- **Behavior:**
  - Initially, `branches` returned `undefined` due to a missing database connection.
  - After fixing the database connection, API returned correct branch data.

### Analysis

- **What did you learn?**
  - API requests should be tested with actual database queries.
- **Unexpected behavior?**
  - API returned `undefined` initially, meaning the database was not connected.
- **Improvements?**
  - Always check if the database connection is successfully established before querying.
- **Enhanced understanding?**
  - Reinforced the importance of database integration with API endpoints.


