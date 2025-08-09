# BrandPeek - Brand Discovery App

A modern React Native app built with Expo for discovering and exploring top brands. Features a clean, gradient-driven design inspired by nurdd.club's aesthetic.

## Features

- **Brand Discovery**: Browse through a curated list of top brands
- **Brand Details**: View comprehensive brand information and campaigns
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **API Integration**: Real-time data fetching from MockAPI
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Smooth loading animations for better UX

## Tech Stack

- **React Native** with Expo SDK 53
- **Expo Router** for navigation
- **TypeScript** for type safety
- **MockAPI** for backend data
- **expo-linear-gradient** for beautiful gradients
- **lucide-react-native** for consistent iconography

## Backend

This app uses MockAPI (https://mockapi.io/) to fetch brand data. The API provides:
- List of brands with basic information
- Detailed brand information by ID
- Realistic data structure for brand discovery

## Project Structure

```
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout configuration
│   ├── index.tsx          # Home screen (brand listing)
│   └── brand/[id].tsx     # Brand detail screen
├── components/            # Reusable UI components
│   ├── BrandCard.tsx      # Brand list item component
│   ├── FollowButton.tsx   # Interactive follow button
│   ├── LoadingScreen.tsx  # Loading state component
│   └── ErrorView.tsx      # Error state component
├── services/              # API and business logic
│   └── brandService.ts    # Brand data fetching service
├── types/                 # TypeScript type definitions
│   └── brand.ts           # Brand interface
└── hooks/                 # Custom React hooks
    └── useFrameworkReady.ts # Framework initialization hook
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brandpeek-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in Expo Go**
   - Install Expo Go on your mobile device
   - Scan the QR code displayed in the terminal
   - The app will load on your device

## API Configuration

The app is configured to use MockAPI at:
```
Base URL: https://675e4b8463b05ed0797824a4.mockapi.io/api/v1
Endpoints:
- GET /brands - List all brands
- GET /brands/:id - Get brand by ID
```

## Key Design Decisions

- **Modular Architecture**: Clean separation of concerns with dedicated folders for components, services, and types
- **Gradient System**: Consistent use of dark blue/purple gradients throughout the app for visual cohesion
- **Error Handling**: Comprehensive error states with user-friendly messages and retry functionality
- **Performance**: Optimized FlatList rendering and efficient state management
- **Accessibility**: Proper touch targets and semantic elements for better accessibility

## Development Notes

- Uses Expo managed workflow for easy deployment and testing
- Implements proper TypeScript typing throughout the application
- Follows React Native best practices for performance and maintainability
- Responsive design that works across different screen sizes
- Clean, modern UI inspired by nurdd.club's design language