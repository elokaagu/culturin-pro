# Vite to Next.js Migration Guide

This project has been converted from a Vite React application to a Next.js application using the App Router.

## What Changed

### Project Structure

- **Removed**: `src/App.tsx`, `src/main.tsx`, `index.html`, `vite.config.ts`
- **Added**: `app/` directory with Next.js App Router structure
- **Moved**: Components, hooks, lib, and data directories to root level for easier imports

### Routing

- **Before**: React Router with `BrowserRouter`, `Routes`, and `Route` components
- **After**: Next.js App Router with file-based routing in the `app/` directory

### Key Routes Created

- `/` → `app/page.tsx` (Index page)
- `/demo` → `app/demo/page.tsx`
- `/pricing` → `app/pricing/page.tsx`
- `/how-it-works` → `app/how-it-works/page.tsx`
- `/about-us` → `app/about-us/page.tsx`
- `/contact` → `app/contact/page.tsx`
- `/culturin-pro` → `app/culturin-pro/page.tsx`
- `/pro-dashboard` → `app/pro-dashboard/page.tsx`
- And many more...

### Dependencies

- **Removed**: `vite`, `@vitejs/plugin-react-swc`, `react-router-dom`, Vite-specific packages
- **Added**: `next`, `eslint-config-next`
- **Updated**: Scripts in `package.json` to use Next.js commands

### Configuration Files

- **Replaced**: `vite.config.ts` with `next.config.js`
- **Updated**: `tsconfig.json` for Next.js compatibility
- **Added**: `next-env.d.ts` for Next.js TypeScript support
- **Updated**: `.eslintrc.json` for Next.js linting rules

## Current Status

### ✅ Completed

- [x] Basic Next.js project structure
- [x] Package.json migration
- [x] TypeScript configuration
- [x] Tailwind CSS configuration
- [x] Basic routing structure
- [x] Component directory structure
- [x] Global styles migration

### ⚠️ Needs Attention

- [ ] React Router dependencies in components need to be updated
- [ ] Navigation hooks (`useNavigate`, `useLocation`, `useParams`) need Next.js equivalents
- [ ] Link components need to use Next.js `Link` component
- [ ] Dynamic routes need proper Next.js implementation
- [ ] Server-side rendering considerations
- [ ] Image optimization with Next.js `Image` component

## Next Steps

1. **Install Dependencies**: Run `npm install` to install Next.js dependencies
2. **Update Components**: Replace React Router imports with Next.js equivalents
3. **Test Routes**: Verify all routes work correctly
4. **Dynamic Routes**: Implement dynamic routes for blog posts, experiences, etc.
5. **Performance**: Optimize with Next.js features like Image optimization
6. **SEO**: Implement proper metadata for each page

## Running the Application

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start
```

## Important Notes

- Many components still reference React Router hooks and components
- These will need to be updated to use Next.js navigation
- The application structure is now ready for Next.js but requires component updates
- Consider implementing proper Next.js patterns like Server Components where appropriate

## Files to Update

The following files contain React Router imports that need to be updated:

- Components in `src/components/` that use `useNavigate`, `useLocation`, or `Link`
- Pages in `src/pages/` that use React Router hooks
- Update import paths to use the new component locations

This migration provides a solid foundation for a Next.js application while preserving the existing component structure and functionality.
