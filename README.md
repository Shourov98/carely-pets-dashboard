# Carely Pets Dashboard

Admin dashboard for managing pet listings, adoptions, service requests, user profiles, reports, notifications, and app settings.

## 1. Project Overview

- Built with `Next.js` App Router (`app/` directory).
- Uses `Redux Toolkit` + `React Redux` for auth and data state.
- Connects to a backend API via `NEXT_PUBLIC_API_BASE_URL`.
- Supports admin authentication and token-based protected API requests.

## 2. Core Features

- Authentication
- Dashboard metrics and monthly/user analytics
- Notifications (list, mark single/all as read)
- Pet management
- Pet type and pet breed management
- Pet's pal management (user/customer profile view)
- Service request management
- Adoption listing management
- Adoption request review and status update
- Reports moderation actions (remove, warn, dismiss, delete)
- Terms & conditions, privacy policy, and settings management
- Profile view and password update

## 3. Tech Stack

- `next@16`
- `react@19`
- `typescript@5`
- `tailwindcss@4`
- `@reduxjs/toolkit`
- `react-redux`
- `recharts`
- `lucide-react`
- `eslint@9`

## 4. Prerequisites

- Node.js `20+`
- One package manager: `pnpm` (recommended), `npm`, `yarn`, or `bun`
- Running backend API server

## 5. Environment Setup

This project currently needs one environment variable:

- `NEXT_PUBLIC_API_BASE_URL`: Base URL of your backend API (example: `http://localhost:5000/api/v1`)

### Steps

1. Copy env template:

```bash
cp .env.example .env.local
```

2. Update `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

3. Restart the dev server after changing environment variables.

## 6. Installation

Install dependencies:

```bash
pnpm install
```

Alternative:

```bash
npm install
# or
yarn install
# or
bun install
```

## 7. Run The App

Start development server:

```bash
pnpm dev
```

Open:

- `http://localhost:3000`

## 8. Available Scripts

- `pnpm dev`: Run development server (`next dev --webpack` with polling enabled)
- `pnpm build`: Build production bundle
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint

## 9. Authentication and State

- Login is handled via `POST /admin/auth/login`.
- Auth snapshot (`user` + `tokens`) is stored in browser `localStorage` under key `auth`.
- Store is configured in `app/store/store.ts`.
- Redux slices:
- `authSlice.ts`
- `usersSlice.ts`
- `petSlice.ts`
- `adoptionSlice.ts`
- `adoptionRequestsSlice.ts`

## 10. Route Map (Implemented Pages)

- `/`
- `/auth/signin`
- `/auth/forget-password`
- `/auth/otp-verify`
- `/auth/reset-password`
- `/auth/pass-changed`
- `/dashboard/dashboard`
- `/dashboard/analytics`
- `/dashboard/notifications`
- `/dashboard/pet-type`
- `/dashboard/pet-type/add`
- `/dashboard/pet-type/[id]`
- `/dashboard/pet-breed`
- `/dashboard/pet-breed/add`
- `/dashboard/pet-breed/[id]`
- `/dashboard/pal-management`
- `/dashboard/pal-management/[id]`
- `/dashboard/pal-management/[id]/pet/[petId]`
- `/dashboard/service-management`
- `/dashboard/service-management/[id]`
- `/dashboard/adoption-list`
- `/dashboard/adoption-list/add`
- `/dashboard/adoption-list/[id]`
- `/dashboard/adoption-list/view/[id]`
- `/dashboard/adoption-requests`
- `/dashboard/adoption-requests/[id]`
- `/dashboard/report`
- `/dashboard/report/[reportId]`
- `/dashboard/terms-conditions`
- `/dashboard/privacy-policy`
- `/dashboard/settings`
- `/dashboard/profile`

## 11. Folder and File Structure

```text
.
├── .env.example
├── .gitignore
├── README.md
├── app
│   ├── auth
│   │   ├── forget-password
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── otp-verify
│   │   │   ├── otp-verify-client.tsx
│   │   │   └── page.tsx
│   │   ├── pass-changed
│   │   │   └── page.tsx
│   │   ├── reset-password
│   │   │   ├── page.tsx
│   │   │   └── reset-password-client.tsx
│   │   └── signin
│   │       └── page.tsx
│   ├── components
│   │   ├── DropDownSelect.tsx
│   │   ├── Navbar.tsx
│   │   ├── RichTextEditor.tsx
│   │   └── Sidebar.tsx
│   ├── dashboard
│   │   ├── adoption-list
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   ├── add
│   │   │   │   ├── GenderRow.tsx
│   │   │   │   ├── HealthRecordFormModal.tsx
│   │   │   │   ├── HealthRecordsSection.tsx
│   │   │   │   ├── NeuteredRow.tsx
│   │   │   │   ├── RecordTypeModal.tsx
│   │   │   │   ├── TrainingRow.tsx
│   │   │   │   ├── VaccinationRow.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── components
│   │   │   │   └── HealthRecordsModal.tsx
│   │   │   ├── page.tsx
│   │   │   └── view
│   │   │       └── [id]
│   │   │           └── page.tsx
│   │   ├── adoption-requests
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── analytics
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── notifications
│   │   │   └── page.tsx
│   │   ├── pal-management
│   │   │   ├── [id]
│   │   │   │   ├── page.tsx
│   │   │   │   └── pet
│   │   │   │       └── [petId]
│   │   │   │           └── page.tsx
│   │   │   └── page.tsx
│   │   ├── pet-breed
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   ├── add
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── pet-type
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   ├── add
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── privacy-policy
│   │   │   └── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── report
│   │   │   ├── ActionMenu.tsx
│   │   │   ├── ConfirmModal.tsx
│   │   │   ├── [reportId]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── service-management
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── settings
│   │   │   └── page.tsx
│   │   └── terms-conditions
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── store
│       ├── StoreProvider.tsx
│       ├── adoptionRequestsSlice.ts
│       ├── adoptionSlice.ts
│       ├── authSlice.ts
│       ├── hooks.ts
│       ├── petSlice.ts
│       ├── store.ts
│       └── usersSlice.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── auth-bg.svg
│   ├── btn.svg
│   ├── file.svg
│   ├── globe.svg
│   ├── logo
│   │   ├── icon_logo.svg
│   │   └── logo.svg
│   ├── logo-auth.svg
│   ├── next.svg
│   ├── paw.svg
│   ├── vercel.svg
│   ├── verify-logo.svg
│   └── window.svg
└── tsconfig.json
```

## 12. API Endpoints Used (Summary)

This frontend calls routes under `NEXT_PUBLIC_API_BASE_URL` such as:

- `/admin/auth/*`
- `/admin/profile*`
- `/admin/users`
- `/admin/pet-types*`
- `/admin/services*`
- `/admin/adoptions*`
- `/admin/dashboard/*`
- `/admin/analytics/*`
- `/admin/reports*`
- `/admin/notifications*`
- `/admin/settings/*`

## 13. Troubleshooting

- `NEXT_PUBLIC_API_BASE_URL is not set.`
- Set the variable in `.env.local` and restart dev server.

- `Missing access token.`
- Sign in first. The app reads auth from Redux/localStorage.

- API request failures
- Confirm backend is running and the base URL points to the correct API prefix.

## 14. Notes

- `next.config.ts` allows remote images from:
- `images.unsplash.com`
- `plus.unsplash.com`
- `carelypet-storage.s3.eu-north-1.amazonaws.com`

