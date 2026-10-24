# ShopNest

Responsive React storefront built with Vite, React Router, and Context API. The sample catalog works without a backend; set the API environment variables to load products and submit orders to the Phase 4 service.

## Run locally

```sh
npm install
npm run dev
```

Create a local `.env` from `.env.example` and set `VITE_API_BASE_URL` to the backend origin. Product and order paths are configurable with `VITE_API_PRODUCTS_PATH` and `VITE_API_ORDERS_PATH`. The frontend expects the product endpoint to return an array or `{ "products": [...] }`; the order endpoint receives `{ customer, items, subtotal, shipping, total }` as JSON. Adjust `src/api/shopApi.js` if the Phase 4 API uses a different contract, authentication scheme, or response shape. The backend must allow browser requests from the frontend origin (CORS).

With no API base URL, the app uses its sample catalog and demo-only checkout. Cart and favorites persist in browser local storage. No payment details are collected.

## Production build

```sh
npm run build
npm run preview
```

The production bundle is written to `dist/`. `vercel.json` includes a history fallback for React Router routes. Configure the same `VITE_API_*` variables in the hosting provider before deploying; client-side variables are public and must never contain secrets. The Phase 4 backend needs to be deployed separately.