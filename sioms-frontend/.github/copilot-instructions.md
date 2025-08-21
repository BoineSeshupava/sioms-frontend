# Copilot Instructions for SIOMS Frontend

## Project Overview
- This is a modular Angular 18+ application for a multi-role (Admin/Customer) e-commerce system.
- Major features are organized under `src/app/modules/` (e.g., `dashboard`, `admin`, `customer`, `products`).
- Shared, core, and authentication logic are in `src/app/shared/`, `src/app/core/`, and `src/app/auth/` respectively.
- The backend is a .NET Core WebAPI (see API endpoint conventions below).

## Key Architectural Patterns
- **Routing:** Uses Angular standalone component routing. Each feature module (e.g., `dashboard`) has its own routing module. Role-based access is enforced via `AuthGuard` and route `data.roles`.
- **Services:** All API communication is handled via Angular services in `src/app/core/services/`. Services are organized by domain (e.g., `product.service.ts`, `order.service.ts`).
- **Models:** Data models are in `src/app/core/models/` and should be used for type safety in services/components.
- **Guards & Interceptors:** Auth logic is in `core/guards/auth.guard.ts` and `core/interceptors/token.interceptor.ts`.
- **Shared Components:** Reusable UI (e.g., navbar, page-not-found) is in `shared/`.

## Developer Workflows
- **Start Dev Server:** `ng serve` (default port 4200)
- **Build:** `ng build`
- **Unit Tests:** `ng test` (Karma)
- **Scaffold Components/Services:** `ng generate component|service <name>`
- **Linting/Formatting:** (Add if custom, otherwise use Angular CLI defaults)

## Project-Specific Conventions
- **Role-based Navigation:** Navbar links are shown/hidden based on `authService.getUserRole()`.
- **API Endpoints:** Services use RESTful endpoints matching backend conventions (e.g., `/api/products`, `/api/orders`).
- **Lazy Loading:** Feature modules/components are lazy-loaded via the router.
- **File Naming:** Use kebab-case for files and folders, PascalCase for classes/components.
- **Component Structure:** Each feature has its own folder with `.component.ts`, `.html`, `.scss`, and `.spec.ts` files.

## Integration Points
- **Backend:** All data is fetched via Angular services calling the .NET Core WebAPI. Endpoints are RESTful and grouped by resource.
- **Auth:** JWT-based authentication; token is attached via `token.interceptor.ts`.
- **Guards:** Use `AuthGuard` with route `data.roles` for access control.

## Examples
- **Protecting a Route:**
  ```typescript
  {
    path: 'admin-home',
    loadComponent: () => import('./admin-home/admin-home.component').then(m => m.AdminHomeComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  }
  ```
- **Service Usage:**
  ```typescript
  this.productService.getProducts().subscribe(products => this.products = products);
  ```
- **Model Import:**
  ```typescript
  import { Product } from 'src/app/core/models/product.model';
  ```

## Key Files/Folders
- `src/app/modules/` — Feature modules
- `src/app/core/services/` — API services
- `src/app/core/models/` — Data models
- `src/app/core/guards/auth.guard.ts` — AuthGuard logic
- `src/app/core/interceptors/token.interceptor.ts` — JWT token handling
- `src/app/shared/` — Shared UI components
- `src/app/app.routes.ts` — App-level routing

---

If you add new features, follow the existing modular and service-oriented patterns. For cross-cutting concerns (auth, error handling), use core services/interceptors. For questions, check the README or existing feature modules for examples.
