# MediBook Frontend

Apollo-style doctor appointment frontend for the Doctor Appointment System hackathon.

## Stack
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React icons

## Implemented flow
1. Login / register
2. Home page with greeting and contact-us card
3. Contact-us popup asks for **ONLINE** or **OFFLINE** first
4. Specialties grid shown in Apollo-inspired layout
5. Specialty click opens doctor listing filtered by specialty + mode
6. Doctor card shows photo, fee, experience, rating and booking button
7. Doctor profile shows slot grid with:
   - green = available
   - gray = booked/unavailable
   - expired same-day slots auto-disabled
8. Booking page shows summary, reason textarea, fee and artifact on success
9. My appointments page with Upcoming / Past / Cancelled tabs
10. Doctor dashboard for status update
11. Admin dashboard for daily summary

## Project structure
See the exact structure inside `/src` matching the requested folder layout.

## Local setup
```bash
cd frontend
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Environment
`.env`
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK=true
```

## Mock mode
- `VITE_USE_MOCK=true` uses localStorage-backed demo data.
- This helps you build the frontend fully before backend integration is finished.

## Real backend integration
Switch to Spring Boot backend by setting:
```env
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:8080
```

## Backend endpoints already wired
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/specialties`
- `GET /api/doctors`
- `GET /api/doctors/{id}`
- `GET /api/doctors/{id}/slots`
- `POST /api/appointments`
- `GET /api/appointments/my`
- `PATCH /api/appointments/{id}/cancel`
- `GET /api/appointments/{id}/artifact`
- `PATCH /api/appointments/{id}/status`
- `GET /api/doctor/schedule/today`
- `GET /api/notifications/my`
- `PATCH /api/notifications/{id}/read`
- `GET /api/admin/summary`

## Demo login accounts in mock mode
- Patient: `patient@example.com` / `Password@123`
- Doctor: `doctor@example.com` / `Password@123`
- Admin: `admin@example.com` / `Password@123`

## Frontend build order you can follow
1. Install dependencies
2. Run in mock mode
3. Verify login/register pages
4. Verify modal-first booking flow from home page
5. Verify specialty → doctors → doctor profile → booking page
6. Verify appointments tab page
7. Verify doctor/admin dashboards
8. Connect to backend endpoints and disable mock mode

## Design notes
- Primary color: blue-600
- Status badges: blue / green / red / amber
- Doctor mode badges: green / orange pills
- Sticky top nav with logo, role badge, bell icon and logout
- Reusable shadow cards with rounded-xl styling
- Responsive grid and mobile-first pages
