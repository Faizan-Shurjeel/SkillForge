# TechNexus Academy - Professional Technology Training Platform

## Overview

TechNexus Academy is a modern full-stack web application designed as a professional technology training platform. The application showcases courses and services with an interactive, visually stunning interface featuring dark themes, gradient accents, and smooth animations. It's built with a React frontend and Express backend, utilizing PostgreSQL for data persistence through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Pattern**: RESTful API endpoints
- **Development**: Hot reload with Vite integration

### Data Storage
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
The application uses four main entities:
- **Users**: Basic user authentication (id, username, password)
- **Courses**: Training courses with pricing, content, and metadata
- **Services**: Professional services with flexible pricing ranges
- **Enrollments**: Course registration data with student information
- **Inquiries**: Contact form submissions for services and general inquiries

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Animated landing area with call-to-action buttons
- **Course Catalog**: Interactive grid with modal details and enrollment forms
- **Services Section**: Horizontal scrolling gallery with detailed service modals
- **Contact Forms**: Integrated forms for inquiries and enrollments
- **Testimonials**: Static testimonial display section

### UI/UX Features
- **Design System**: Apple-inspired design with neutral color palette
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: User feedback for form submissions and API responses

## Data Flow

### Client-Server Communication
1. **Frontend** makes API requests using TanStack Query
2. **Express routes** handle HTTP requests with proper error handling
3. **Storage layer** abstracts database operations (Memory/Drizzle)
4. **Database operations** use Drizzle ORM with PostgreSQL
5. **Response data** flows back through the same chain with proper typing

### Form Submission Flow
1. User fills out course enrollment or service inquiry forms
2. Frontend validates data using Zod schemas
3. API request sent to appropriate endpoint (/api/enrollments or /api/inquiries)
4. Backend validates and stores data in database
5. Success/error feedback displayed via toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **zod**: TypeScript-first schema validation

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **@replit/***: Replit-specific development plugins
- **esbuild**: JavaScript bundler for production builds

### UI Enhancement Libraries
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **lucide-react**: Icon library
- **react-icons**: Additional icon sets

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema is up-to-date

### Environment Configuration
- **Development**: Uses Vite dev server with hot reload and proxy
- **Production**: Serves static files from Express with optimized bundles
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon recommended)
- Environment variables for database connection
- Static file serving capability for frontend assets

The application is designed to be deployed on platforms like Replit, Vercel, or traditional VPS hosting with minimal configuration changes.