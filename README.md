# ProductCatalog

A product catalog app: browse, search, filter, paginate, view details, and save favorites.

## Technologies

- Vue 3
- Nuxt 4
- TypeScript
- Tailwind CSS
- Pinia
- Axios
- Git

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Project structure

```text
app/
  pages/         Routes
  layouts/       Page layout
  components/    UI
  composables/   Logic
  stores/        Pinia state
  services/      API
  utils/         Helpers
  plugins/       App plugins
public/          Static files
```

## Architecture

Layered architecture. Each layer has one job and talks only to the layer below it:

```text
pages        → routes
components   → UI
composables  → catalog state and fetching
stores       → client state (favorites)
services     → HTTP / DummyJSON API
```

Pages render components. Components do not call the API. Data goes through composables or stores, then services.

## Technical decisions

- No UI library was used because the project is small and the UI requirements are simple.
- Axios is used instead of `fetch` to support a central API client, shared config, and interceptor-based error handling.
- A central API client was added to keep the base URL and shared API behavior in one place.
- General API errors are handled in `api-service` and redirected to `app/error.vue`.
- API services are separated into their own layer to keep API calls out of components.
- Routes are implemented in the `pages` directory, and page files stay lightweight.
- The `/products/:id` dynamic route is used for the product details page.
- The `/products/category/:category` dynamic route is used for category filtering.
- Product category filtering is URL-based, so filtered pages are shareable and work after refresh.
- Product search uses a 500ms debounce to reduce unnecessary API requests while typing.
- Product fetching supports simple pagination using `limit` and `skip`.
- Favorites are stored with Pinia and persisted in `localStorage`.
- Product fetching logic was moved out of the component and into a composable.
- `ProductGallery` was separated from `ProductDetails` to keep the details component smaller.
- Price formatting was moved to `utils` instead of keeping it inside components.

## Future improvements

- If the project was larger, I would use a UI library for more consistent and reusable UI components.
- If there was more time, I would cache the categories list to avoid unnecessary API requests.
- Loading states could be improved with skeleton components instead of simple loading text.
- Search could be changed to URL-based search, so search state would be shareable and preserved after refresh.
- Search, sort, and pagination state could be stored in the URL to make the full product list state shareable.
