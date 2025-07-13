# VillageStay - Authentic Rural Tourism Marketplace

A beautiful, fully-featured rural tourism marketplace built with Next.js, React, and Tailwind CSS. VillageStay connects travelers with authentic rural experiences across India, from mountain retreats to desert camps.

## 🌟 Features

### Core Functionality
- **Property Listings**: Browse authentic rural accommodations with detailed information
- **Advanced Search & Filters**: Find perfect stays by location, price, amenities, and more
- **Package Tours**: Multi-day curated experiences with accommodation and activities
- **Booking System**: Complete booking flow with multi-step forms and offline support
- **User Authentication**: Secure login/signup with social media integration
- **Reviews & Ratings**: Comprehensive review system with rating breakdowns
- **Wishlist**: Save favorite properties for later
- **AI Chat Assistant**: Intelligent chatbot for travel assistance

### Technical Features
- **PWA Ready**: Service worker, offline support, and app-like experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations throughout the app
- **Local Storage**: Offline booking and data persistence
- **Mock API**: Complete mock backend with realistic data
- **SEO Optimized**: Proper meta tags and structured data

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd villagestay
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
/VillageStay
├── package.json
├── tailwind.config.js
├── next.config.js
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker
├── src/
│   ├── pages/
│   │   ├── index.js           # Home page
│   │   ├── listings.js        # Search results
│   │   ├── listing/[id].js    # Listing details
│   │   ├── login.js           # Authentication
│   │   └── signup.js
│   ├── components/
│   │   ├── Navbar.js          # Navigation
│   │   ├── Footer.js          # Footer
│   │   ├── SearchBar.js       # Search functionality
│   │   ├── ListingCard.js     # Property cards
│   │   ├── PackageCard.js     # Package cards
│   │   ├── HeroSection.js     # Hero banner
│   │   ├── BookingForm.js     # Booking flow
│   │   └── AIChatWidget.js    # AI assistant
│   ├── styles/
│   │   └── globals.css        # Global styles
│   ├── mocks/
│   │   ├── listings.js        # Property data
│   │   ├── packages.js        # Package data
│   │   └── reviews.js         # Review data
│   └── utils/
│       ├── api.js             # API functions
│       └── helpers.js         # Utility functions
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Green (#22c55e) - Nature, growth, sustainability
- **Secondary**: Yellow (#fbbf24) - Warmth, energy, optimism  
- **Accent**: Beige (#d4c252) - Earth, authenticity, comfort
- **Earth Tones**: Browns and warm grays for rural aesthetic

### Typography
- **Primary Font**: Inter (clean, modern)
- **Secondary Font**: Merriweather (readable, traditional)

### Components
- Rounded corners (8px-16px)
- Subtle shadows and hover effects
- Smooth transitions (300ms)
- Consistent spacing (8px grid system)

## 🔧 Key Components

### SearchBar
Advanced search with location, dates, guests, and filters
```javascript
<SearchBar onSearch={handleSearch} />
```

### ListingCard
Property display with images, pricing, and quick actions
```javascript
<ListingCard listing={listingData} />
```

### BookingForm
Multi-step booking process with validation
```javascript
<BookingForm listing={listing} onBookingSubmit={handleBooking} />
```

### AIChatWidget
Intelligent chat assistant for travel help
```javascript
<AIChatWidget />
```

## 📱 PWA Features

### Service Worker
- Caches important resources for offline access
- Background sync for offline bookings
- Push notifications for updates

### Offline Support
- Browse cached listings when offline
- Save bookings to localStorage when offline
- Sync data when connection is restored

### App-like Experience
- Install prompt for mobile users
- Standalone display mode
- Custom splash screen

## 🎯 Mock Data

The app includes comprehensive mock data:

### Listings (6 properties)
- Mountain cabins in Himachal Pradesh
- Houseboats in Kerala backwaters  
- Desert camps in Rajasthan
- Beach cottages in Goa
- Eco lodges in Rishikesh
- Tea garden bungalows in Darjeeling

### Packages (4 experiences)
- Himalayan Adventure Package (7 days)
- Kerala Backwaters & Spice Trail (5 days)
- Rajasthan Royal Heritage Trail (6 days)
- Goa Beach & Culture Experience (4 days)

### Features
- Realistic pricing in Indian Rupees
- Authentic descriptions and amenities
- Host information and verification
- Review data with ratings
- High-quality stock photos from Pexels

## 🔐 Authentication

### Login Features
- Email/password authentication
- Social login (Google, Facebook)
- Remember me functionality
- Password strength validation
- Demo credentials provided

### User Management
- Profile management
- Booking history
- Wishlist functionality
- Preferences and settings

## 📊 State Management

### Local Storage
- User authentication state
- Booking data persistence
- Wishlist management
- Search preferences
- Chat history

### API Layer
- Mock API with realistic delays
- Error handling and loading states
- Optimistic updates
- Offline queue management

## 🎨 Animations

### Framer Motion
- Page transitions
- Component entrance animations
- Hover effects and micro-interactions
- Loading states and skeletons
- Smooth scrolling and parallax

### CSS Animations
- Custom keyframes for special effects
- Transition utilities
- Transform effects
- Loading spinners

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

### Mobile Features
- Touch-friendly interface
- Swipe gestures for image galleries
- Collapsible navigation
- Optimized forms and inputs

## 🔍 SEO & Performance

### Meta Tags
- Dynamic page titles and descriptions
- Open Graph tags for social sharing
- Structured data for search engines
- Proper heading hierarchy

### Performance
- Image optimization
- Code splitting
- Lazy loading
- Efficient re-renders
- Minimal bundle size

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Static Export
The app is configured for static export and can be deployed to:
- Netlify
- Vercel  
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Images**: High-quality stock photos from Pexels
- **Icons**: Lucide React icon library
- **Fonts**: Google Fonts (Inter, Merriweather)
- **Animations**: Framer Motion library
- **Styling**: Tailwind CSS framework

## 📞 Support

For support and questions:
- Email: hello@villagestay.com
- Phone: +91 98765 43210
- Website: https://villagestay.com

---

**VillageStay** - Discover Authentic Rural India 🏔️🏖️🏜️