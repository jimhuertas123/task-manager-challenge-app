# Task Manager App

React, TypeScript, and GraphQL Ravn's final challenge.

## 📋 Project Description

This application is a task management dashboard that allows users to organize, track, and manage tasks across different status columns (Backlog, Todo, In Progress, Done, Cancelled). Built with modern React patterns and GraphQL for efficient data management.

## 🚀 Setup/Running Instructions

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation & Development

````bash
# Clone the repository
git clone <repository-url>
cd task-manager-app

# Install dependencies
yarn install

# Start development server
yarn dev

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
npm run codegen      # Generate GraphQL types
````

## 🛠 Technologies/Libraries Used

### Core Stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM**

### GraphQL & State Management

- **Apollo Client**
- **GraphQL Code Generator**

### Development Tools

- **ESLint**
- **Prettier**
- **Husky**
- **lint-staged**
- **react-error-boundary**

### CI/CD

- **GitHub Actions**
- **Vercel**

## 🏗 Project Structure & Architecture

**Feature-Driven Development (FDD)**

```
src/
├── components/
│   ├── ui/
│   ├── layout/
│   └── features/
├── pages/
├── hooks/
├── graphql/
├── lib/
├── utils/
├── types/
└── styles/
```

## 📝 Development Progress

### ✅ Completed (Day 1 - Sept 9, 2025)

**Project Setup & Configuration:**

- [x] Initial React + TypeScript + Vite setup
- [x] GraphQL stack configuration (Apollo Client + Code Generator)
- [x] Development tooling setup (ESLint, Prettier, Husky)
- [x] CI/CD pipeline with GitHub Actions
- [x] Vercel deployment configuration with SPA routing
- [x] Project architecture planning and folder structure design
- [x] Error boundary strategy with react-error-boundary

**Quality Assurance Setup:**

- [x] Pre-commit hooks with Husky
- [x] Automated linting and formatting
- [x] TypeScript strict mode configuration
- [x] GitHub Actions workflow for testing and deployment
- [x] Proper SPA routing configuration for Vercel

### 🔄 Next Steps (Day 2 - Sept 10, 2025)

- [ ] Implement folder structure and core architecture
- [ ] Setup Apollo Client with GraphQL endpoint
- [ ] Create layout components (Sidebar, Header, MainLayout)
- [ ] Implement routing with React Router and error pages
- [ ] Begin dashboard UI development

## 🎯 Features Roadmap

### Week 1: Foundation & Core UI

- [ ] Dashboard layout with sidebar navigation
- [ ] Task board with status columns
- [ ] Task cards with all required information
- [ ] Basic routing setup with NotFound and Error pages
- [ ] SCSS styling architecture

### Week 2: Functionality & Advanced Features

- [ ] GraphQL integration for CRUD operations
- [ ] Search and filtering functionality
- [ ] User settings page
- [ ] Bonus features (drag & drop, animations, etc.)

## 🚧 Current Status

**Day 1 Complete** - Project foundation and development environment fully configured with modern tooling, CI/CD pipeline, error handling, and deployment strategy.
