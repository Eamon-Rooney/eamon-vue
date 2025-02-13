# eamon-vue docker build
```sh
docker-compose up --build
```

# eamon-vue docker stop
```sh
docker-compose down
```

# eamon-vue json fix
Updated API sampledata.json to use "lastTenVoltageReadings" instead of "lastTenVoltgageReadings" 
i.e. request for API to update Backend for correct spelling



------------------------------------------------------


# Below OOTB scripts for local install, testing and linting

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
