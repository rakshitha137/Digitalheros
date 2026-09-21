# Testing Suite Documentation

Documentation for unit tests, integration tests, and Playwright end-to-end tests.

---

## 1. Unit & Integration Tests (Vitest)

Run Vitest suite:
```bash
npm test
```

### Test Coverage Areas:
- **Score Validation**: Enforces integer bounds (1–45) and single entry per date limit (`tests/score-converter.test.ts`).
- **Rolling 5-Score Selection**: Validates newest-first date ordering and 5-score windowing.
- **Score-to-Number Converter**: Tests candidate duplicates, 45 values wraparound (45 -> 1), and all-identical score sets.
- **Draw Engine & Integer Math**: Tests match counting, minor currency prize pool calculation, 40%/35%/25% tier allocation, equal winner splitting, jackpot rollover, and undistributed pool tracking (`tests/draw-engine.test.ts`).

---

## 2. End-to-End Tests (Playwright)

Run Playwright E2E suite:
```bash
npx playwright test
```

### E2E Flow Coverage:
- Homepage rendering & title verification (`tests/e2e/homepage.spec.ts`).
- Navigation to `/how-it-works`, `/charities`, `/pricing`, `/dashboard`.
