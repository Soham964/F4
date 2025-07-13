export const mockPackages = [
  {
    id: 1,
    title: "Himalayan Adventure Package",
    location: "Himachal Pradesh & Uttarakhand",
    duration: "7 days, 6 nights",
    price: 28000,
    priceUnit: "per person",
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1838547/pexels-photo-1838547.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Embark on an unforgettable journey through the majestic Himalayas. This comprehensive package includes mountain trekking, spiritual experiences, and cultural immersion.",
    highlights: [
      "Guided trek to Triund Hill",
      "Yoga and meditation sessions in Rishikesh",
      "White water rafting on the Ganges",
      "Visit to authentic mountain villages",
      "Sunrise viewing from Kausani",
      "Cultural performances and local cuisine",
    ],
    inclusions: [
      "Accommodation in eco-friendly lodges",
      "All meals (vegetarian and non-vegetarian options)",
      "Professional guide and porter services",
      "Transportation in comfortable vehicles",
      "Trekking equipment and safety gear",
      "Entry fees to all attractions",
      "Travel insurance",
    ],
    exclusions: [
      "Flight tickets to and from destination",
      "Personal expenses and shopping",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Medical expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dharamshala",
        description: "Arrive in Dharamshala, check-in to eco-lodge, orientation session, and local sightseeing including Mcleod Ganj.",
        meals: ["Dinner"],
        accommodation: "Mountain View Eco Lodge",
      },
      {
        day: 2,
        title: "Dharamshala to Triund Trek",
        description: "Early morning trek to Triund Hill, enjoy panoramic views, camping under the stars with bonfire.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Triund Camping",
      },
      {
        day: 3,
        title: "Triund to Rishikesh",
        description: "Descend from Triund, travel to Rishikesh, check-in to ashram, evening Ganga Aarti ceremony.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Riverside Ashram",
      },
      {
        day: 4,
        title: "Rishikesh Adventure Day",
        description: "Morning yoga session, white water rafting, visit to Beatles Ashram, evening meditation.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Riverside Ashram",
      },
      {
        day: 5,
        title: "Rishikesh to Kausani",
        description: "Journey to Kausani, check-in to heritage hotel, evening tea plantation visit.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Heritage Mountain Hotel",
      },
      {
        day: 6,
        title: "Kausani Exploration",
        description: "Sunrise viewing, visit to Anasakti Ashram, local village tour, cultural program.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Heritage Mountain Hotel",
      },
      {
        day: 7,
        title: "Departure",
        description: "Morning at leisure, check-out, transfer to nearest airport/railway station.",
        meals: ["Breakfast"],
        accommodation: "N/A",
      },
    ],
    maxGroupSize: 12,
    minGroupSize: 4,
    difficulty: "Moderate",
    bestTime: "March to June, September to November",
    guide: {
      name: "Rakesh Thakur",
      experience: "8 years",
      languages: ["Hindi", "English", "Garhwali"],
      specialization: "Mountain Trekking & Spiritual Tourism",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    availableDates: [
      "2024-03-15",
      "2024-03-29",
      "2024-04-12",
      "2024-04-26",
      "2024-05-10",
      "2024-05-24",
    ],
    cancellationPolicy: "Free cancellation up to 15 days before departure. 50% refund for cancellations 7-14 days before. No refund for cancellations within 7 days.",
    tags: ["Adventure", "Spiritual", "Trekking", "Cultural", "Nature"],
    category: "Adventure",
  },
  {
    id: 2,
    title: "Kerala Backwaters & Spice Trail",
    location: "Kerala - Alleppey, Munnar, Thekkady",
    duration: "5 days, 4 nights",
    price: 22000,
    priceUnit: "per person",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.pexels.com/photos/5644718/pexels-photo-5644718.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/5644718/pexels-photo-5644718.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1591370/pexels-photo-1591370.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Discover the enchanting beauty of Kerala through its serene backwaters, lush spice plantations, and rich cultural heritage.",
    highlights: [
      "Houseboat cruise in Alleppey backwaters",
      "Spice plantation tour in Thekkady",
      "Tea garden visits in Munnar",
      "Traditional Ayurvedic treatments",
      "Kathakali dance performance",
      "Authentic Kerala cuisine cooking class",
    ],
    inclusions: [
      "Deluxe houseboat accommodation",
      "Heritage hotel stays",
      "All meals with Kerala specialties",
      "Private transportation",
      "Professional tour guide",
      "Spice plantation tours",
      "Ayurvedic massage sessions",
    ],
    exclusions: [
      "Flight tickets",
      "Personal expenses",
      "Alcohol (except on houseboat)",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kochi - Alleppey",
        description: "Arrive in Kochi, drive to Alleppey, board traditional houseboat, cruise through backwaters.",
        meals: ["Lunch", "Dinner"],
        accommodation: "Deluxe Houseboat",
      },
      {
        day: 2,
        title: "Alleppey to Thekkady",
        description: "Morning backwater cruise, drive to Thekkady, check-in to spice resort, evening spice plantation tour.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Spice Garden Resort",
      },
      {
        day: 3,
        title: "Thekkady Exploration",
        description: "Periyar Wildlife Sanctuary visit, bamboo rafting, elephant interaction, traditional massage.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Spice Garden Resort",
      },
      {
        day: 4,
        title: "Thekkady to Munnar",
        description: "Drive to Munnar through scenic hills, check-in to tea estate, visit tea museum, sunset point.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Tea Estate Bungalow",
      },
      {
        day: 5,
        title: "Munnar - Kochi Departure",
        description: "Morning tea garden walk, drive to Kochi, city tour, transfer to airport/railway station.",
        meals: ["Breakfast", "Lunch"],
        accommodation: "N/A",
      },
    ],
    maxGroupSize: 16,
    minGroupSize: 2,
    difficulty: "Easy",
    bestTime: "October to March",
    guide: {
      name: "Suresh Kumar",
      experience: "12 years",
      languages: ["Malayalam", "English", "Tamil", "Hindi"],
      specialization: "Kerala Culture & Natural History",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    availableDates: [
      "2024-03-08",
      "2024-03-22",
      "2024-04-05",
      "2024-04-19",
      "2024-05-03",
      "2024-05-17",
    ],
    cancellationPolicy: "Free cancellation up to 10 days before departure. 25% refund for cancellations 5-9 days before. No refund for cancellations within 5 days.",
    tags: ["Backwaters", "Spice Tours", "Cultural", "Relaxation", "Nature"],
    category: "Cultural",
  },
  {
    id: 3,
    title: "Rajasthan Royal Heritage Trail",
    location: "Rajasthan - Jaipur, Jodhpur, Udaipur",
    duration: "6 days, 5 nights",
    price: 35000,
    priceUnit: "per person",
    rating: 4.9,
    reviewCount: 234,
    image: "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2363766/pexels-photo-2363766.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1698677/pexels-photo-1698677.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Experience the grandeur of Rajasthan's royal heritage through magnificent palaces, desert adventures, and cultural immersion.",
    highlights: [
      "Stay in heritage palace hotels",
      "Desert safari with camel rides",
      "Traditional Rajasthani folk performances",
      "Vintage car ride through old cities",
      "Craft workshop experiences",
      "Royal dining experiences",
    ],
    inclusions: [
      "Heritage palace hotel stays",
      "All meals with Rajasthani cuisine",
      "Private luxury transportation",
      "Professional heritage guide",
      "Desert safari experience",
      "Cultural shows and performances",
      "Craft workshop sessions",
    ],
    exclusions: [
      "Flight tickets",
      "Personal shopping",
      "Alcohol",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaipur",
        description: "Arrive in Jaipur, check-in to heritage hotel, city palace tour, evening cultural show.",
        meals: ["Dinner"],
        accommodation: "Heritage Palace Hotel",
      },
      {
        day: 2,
        title: "Jaipur Exploration",
        description: "Amber Fort visit, Hawa Mahal, Jantar Mantar, traditional craft workshop, royal dinner.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Heritage Palace Hotel",
      },
      {
        day: 3,
        title: "Jaipur to Jodhpur",
        description: "Drive to Jodhpur, check-in to fort hotel, Mehrangarh Fort visit, sunset from fort walls.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Fort Palace Hotel",
      },
      {
        day: 4,
        title: "Jodhpur - Desert Experience",
        description: "Blue city tour, desert safari, camel rides, traditional village visit, desert camping.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Luxury Desert Camp",
      },
      {
        day: 5,
        title: "Jodhpur to Udaipur",
        description: "Drive to Udaipur, check-in to lake palace, city palace tour, boat ride on Lake Pichola.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Lake Palace Hotel",
      },
      {
        day: 6,
        title: "Udaipur Departure",
        description: "Morning at leisure, Saheliyon Ki Bari visit, vintage car ride, transfer to airport.",
        meals: ["Breakfast", "Lunch"],
        accommodation: "N/A",
      },
    ],
    maxGroupSize: 10,
    minGroupSize: 2,
    difficulty: "Easy",
    bestTime: "October to March",
    guide: {
      name: "Maharaja Singh",
      experience: "15 years",
      languages: ["Hindi", "English", "Rajasthani", "Marwari"],
      specialization: "Royal Heritage & Desert Tourism",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    availableDates: [
      "2024-03-10",
      "2024-03-24",
      "2024-04-07",
      "2024-04-21",
      "2024-05-05",
      "2024-05-19",
    ],
    cancellationPolicy: "Free cancellation up to 20 days before departure. 50% refund for cancellations 10-19 days before. 25% refund for cancellations 5-9 days before.",
    tags: ["Royal Heritage", "Desert Safari", "Cultural", "Luxury", "History"],
    category: "Heritage",
  },
  {
    id: 4,
    title: "Goa Beach & Culture Experience",
    location: "North & South Goa",
    duration: "4 days, 3 nights",
    price: 18000,
    priceUnit: "per person",
    rating: 4.7,
    reviewCount: 198,
    image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Discover the perfect blend of beaches, Portuguese heritage, and vibrant culture in the coastal paradise of Goa.",
    highlights: [
      "Beach hopping across North and South Goa",
      "Portuguese heritage tour",
      "Spice plantation visit",
      "Sunset cruise with dolphin watching",
      "Traditional Goan cooking class",
      "Beach yoga and wellness sessions",
    ],
    inclusions: [
      "Beach resort accommodation",
      "All meals including seafood specialties",
      "Private transportation",
      "Professional local guide",
      "Sunset cruise",
      "Spice plantation tour",
      "Cooking class",
    ],
    exclusions: [
      "Flight tickets",
      "Water sports activities",
      "Alcohol",
      "Personal expenses",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival - North Goa",
        description: "Arrive in Goa, check-in to beach resort, Calangute and Baga beach visit, evening at leisure.",
        meals: ["Dinner"],
        accommodation: "Beach Resort",
      },
      {
        day: 2,
        title: "North Goa Exploration",
        description: "Anjuna flea market, Chapora Fort, Vagator beach, sunset cruise with dolphin watching.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beach Resort",
      },
      {
        day: 3,
        title: "Heritage & Spice Tour",
        description: "Old Goa churches tour, spice plantation visit, traditional Goan lunch, cooking class.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beach Resort",
      },
      {
        day: 4,
        title: "South Goa - Departure",
        description: "South Goa beaches, beach yoga session, shopping at local markets, transfer to airport.",
        meals: ["Breakfast", "Lunch"],
        accommodation: "N/A",
      },
    ],
    maxGroupSize: 14,
    minGroupSize: 2,
    difficulty: "Easy",
    bestTime: "November to March",
    guide: {
      name: "Carlos Fernandes",
      experience: "10 years",
      languages: ["English", "Hindi", "Konkani", "Portuguese"],
      specialization: "Beach Tourism & Goan Culture",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    availableDates: [
      "2024-03-12",
      "2024-03-26",
      "2024-04-09",
      "2024-04-23",
      "2024-05-07",
      "2024-05-21",
    ],
    cancellationPolicy: "Free cancellation up to 7 days before departure. 50% refund for cancellations 3-6 days before. No refund for cancellations within 3 days.",
    tags: ["Beach", "Portuguese Heritage", "Cultural", "Relaxation", "Food"],
    category: "Beach",
  },
];

export const getPackages = (filters = {}) => {
  let filteredPackages = [...mockPackages];
  
  if (filters.location) {
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  if (filters.priceMin) {
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.price >= filters.priceMin
    );
  }
  
  if (filters.priceMax) {
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.price <= filters.priceMax
    );
  }
  
  if (filters.category) {
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.category.toLowerCase() === filters.category.toLowerCase()
    );
  }
  
  if (filters.duration) {
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.duration.includes(filters.duration)
    );
  }
  
  return filteredPackages;
};

export const getPackageById = (id) => {
  return mockPackages.find(pkg => pkg.id === parseInt(id));
};

export const getFeaturedPackages = () => {
  return mockPackages.slice(0, 3);
};

export const getPackagesByCategory = (category) => {
  return mockPackages.filter(pkg => 
    pkg.category.toLowerCase() === category.toLowerCase()
  );
};