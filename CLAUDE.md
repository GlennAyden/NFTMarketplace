# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an NFT Marketplace project built with Next.js 15, TypeScript, and TailwindCSS. The project follows the App Router architecture and is part of a Web3 fullstack course.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts and global styles
  - `page.tsx` - Home page component
  - `globals.css` - Global TailwindCSS styles
- TypeScript configuration uses path mapping `@/*` to `./src/*`

### Key Technologies
- **Next.js 15** with App Router and Turbopack for fast development
- **TypeScript** with strict mode enabled
- **TailwindCSS 4** for styling with PostCSS
- **React 19** for UI components
- **Geist fonts** (Sans and Mono) loaded via next/font/google

### Configuration Files
- `tsconfig.json` - TypeScript configuration with Next.js plugin and path mapping
- `eslint.config.mjs` - ESLint configuration extending Next.js core web vitals and TypeScript rules
- `next.config.ts` - Next.js configuration (currently minimal)
- `postcss.config.mjs` - PostCSS configuration for TailwindCSS

## Development Notes

- Uses Turbopack for faster development and build processes
- ESLint configuration ignores build directories (.next, out, build) and node_modules
- Project uses React 19 and Next.js 15 latest features
- Font optimization is handled automatically via next/font/google