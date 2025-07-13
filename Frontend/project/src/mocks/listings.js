export const mockListings = [
  {
    id: 1,
    title: "Cozy Mountain Cabin Retreat",
    location: "Himachal Pradesh, India",
    price: 3500,
    priceUnit: "per night",
    rating: 4.8,
    reviewCount: 156,
    host: {
      name: "Ravi Sharma",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    images: [
      "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1838547/pexels-photo-1838547.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Experience the serenity of the Himalayas in this authentic mountain cabin. Perfect for families seeking a peaceful retreat with stunning valley views.",
    amenities: ["WiFi", "Fireplace", "Mountain View", "Hiking Trails", "Local Cuisine", "Organic Garden"],
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 1,
    type: "Cabin",
    available: true,
    instantBook: true,
    features: {
      wifi: true,
      parking: true,
      kitchen: true,
      petFriendly: false,
      smoking: false,
    },
    coordinates: {
      lat: 32.2432,
      lng: 77.1892,
    },
    checkIn: "14:00",
    checkOut: "11:00",
    cancellation: "flexible",
    languages: ["Hindi", "English", "Punjabi"],
    activities: ["Trekking", "Bird Watching", "Photography", "Meditation", "Organic Farming"],
    nearbyAttractions: ["Manali", "Solang Valley", "Rohtang Pass"],
    policies: {
      smoking: false,
      pets: false,
      parties: false,
      children: true,
    },
    safety: ["First Aid Kit", "Fire Extinguisher", "Emergency Contacts"],
  },
  {
    id: 2,
    title: "Traditional Kerala Houseboat",
    location: "Alleppey, Kerala",
    price: 4200,
    priceUnit: "per night",
    rating: 4.9,
    reviewCount: 203,
    host: {
      name: "Priya Nair",
      avatar: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    images: [
      "https://images.pexels.com/photos/5644718/pexels-photo-5644718.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1591370/pexels-photo-1591370.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Sail through the enchanting backwaters of Kerala in this traditional houseboat. Enjoy authentic local cuisine and witness rural life up close.",
    amenities: ["AC", "Traditional Meals", "Backwater Views", "Local Guide", "Fishing", "Sunset Views"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    type: "Houseboat",
    available: true,
    instantBook: false,
    features: {
      wifi: false,
      parking: false,
      kitchen: true,
      petFriendly: false,
      smoking: false,
    },
    coordinates: {
      lat: 9.4981,
      lng: 76.3388,
    },
    checkIn: "12:00",
    checkOut: "10:00",
    cancellation: "moderate",
    languages: ["Malayalam", "English", "Tamil"],
    activities: ["Backwater Cruising", "Fishing", "Village Tours", "Ayurvedic Massage", "Cooking Classes"],
    nearbyAttractions: ["Kumarakom", "Vembanad Lake", "Pathiramanal Island"],
    policies: {
      smoking: false,
      pets: false,
      parties: false,
      children: true,
    },
    safety: ["Life Jackets", "First Aid Kit", "Communication Device"],
  },
  {
    id: 3,
    title: "Rajasthani Desert Camp",
    location: "Jaisalmer, Rajasthan",
    price: 2800,
    priceUnit: "per night",
    rating: 4.7,
    reviewCount: 189,
    host: {
      name: "Vikram Singh",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    images: [
      "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2363766/pexels-photo-2363766.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1698677/pexels-photo-1698677.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Experience the magic of the Thar Desert in this luxury camp. Enjoy camel rides, folk performances, and stargazing under the desert sky.",
    amenities: ["Desert Safari", "Camel Rides", "Folk Dance", "Stargazing", "Traditional Meals", "Bonfire"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 2,
    type: "Desert Camp",
    available: true,
    instantBook: true,
    features: {
      wifi: true,
      parking: true,
      kitchen: false,
      petFriendly: false,
      smoking: true,
    },
    coordinates: {
      lat: 26.9157,
      lng: 70.9083,
    },
    checkIn: "15:00",
    checkOut: "10:00",
    cancellation: "strict",
    languages: ["Hindi", "English", "Rajasthani"],
    activities: ["Desert Safari", "Camel Riding", "Stargazing", "Folk Performances", "Sand Dune Climbing"],
    nearbyAttractions: ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli"],
    policies: {
      smoking: true,
      pets: false,
      parties: true,
      children: true,
    },
    safety: ["Desert Guide", "First Aid Kit", "Emergency Water"],
  },
  {
    id: 4,
    title: "Goan Beach Cottage",
    location: "Arambol, Goa",
    price: 2200,
    priceUnit: "per night",
    rating: 4.6,
    reviewCount: 142,
    host: {
      name: "Maria D'Souza",
      avatar: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    images: [
      "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Relax in this charming beach cottage just steps away from the pristine Arambol beach. Perfect for couples and solo travelers seeking tranquility.",
    amenities: ["Beach Access", "WiFi", "Bicycle Rental", "Local Seafood", "Yoga Classes", "Sunset Views"],
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    type: "Beach Cottage",
    available: true,
    instantBook: false,
    features: {
      wifi: true,
      parking: true,
      kitchen: true,
      petFriendly: true,
      smoking: false,
    },
    coordinates: {
      lat: 15.6869,
      lng: 73.7056,
    },
    checkIn: "14:00",
    checkOut: "11:00",
    cancellation: "flexible",
    languages: ["English", "Hindi", "Konkani", "Portuguese"],
    activities: ["Beach Walks", "Water Sports", "Yoga", "Dolphin Watching", "Spice Plantation Tours"],
    nearbyAttractions: ["Arambol Beach", "Chapora Fort", "Anjuna Flea Market"],
    policies: {
      smoking: false,
      pets: true,
      parties: false,
      children: true,
    },
    safety: ["Beach Safety Guidelines", "First Aid Kit", "Emergency Contacts"],
  },
  {
    id: 5,
    title: "Himalayan Eco Lodge",
    location: "Rishikesh, Uttarakhand",
    price: 3800,
    priceUnit: "per night",
    rating: 4.9,
    reviewCount: 267,
    host: {
      name: "Swami Anand",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    images: [
      "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1591370/pexels-photo-1591370.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Find inner peace at this sustainable eco-lodge in the spiritual heart of India. Enjoy yoga sessions, meditation, and organic meals.",
    amenities: ["Yoga Classes", "Meditation", "Organic Meals", "River Views", "Spa Services", "Nature Walks"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    type: "Eco Lodge",
    available: true,
    instantBook: true,
    features: {
      wifi: true,
      parking: true,
      kitchen: false,
      petFriendly: false,
      smoking: false,
    },
    coordinates: {
      lat: 30.0869,
      lng: 78.2676,
    },
    checkIn: "12:00",
    checkOut: "10:00",
    cancellation: "moderate",
    languages: ["Hindi", "English", "Sanskrit"],
    activities: ["Yoga", "Meditation", "River Rafting", "Trekking", "Spiritual Workshops"],
    nearbyAttractions: ["Laxman Jhula", "Ram Jhula", "Parmarth Niketan"],
    policies: {
      smoking: false,
      pets: false,
      parties: false,
      children: true,
    },
    safety: ["Yoga Safety Guidelines", "First Aid Kit", "River Safety Equipment"],
  },
  {
    id: 6,
    title: "Tea Garden Bungalow",
    location: "Darjeeling, West Bengal",
    price: 4500,
    priceUnit: "per night",
    rating: 4.8,
    reviewCount: 178,
    host: {
      name: "Tenzin Sherpa",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    images: [
      "https://images.pexels.com/photos/1838547/pexels-photo-1838547.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description: "Wake up to breathtaking views of tea gardens and the Kanchenjunga range. Experience the colonial charm and learn about tea cultivation.",
    amenities: ["Mountain Views", "Tea Garden Tours", "Colonial Architecture", "Fireplace", "Local Cuisine", "Sunrise Views"],
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    type: "Bungalow",
    available: true,
    instantBook: false,
    features: {
      wifi: true,
      parking: true,
      kitchen: true,
      petFriendly: false,
      smoking: false,
    },
    coordinates: {
      lat: 27.0410,
      lng: 88.2663,
    },
    checkIn: "13:00",
    checkOut: "11:00",
    cancellation: "moderate",
    languages: ["English", "Hindi", "Nepali", "Bengali"],
    activities: ["Tea Garden Tours", "Sunrise Viewing", "Toy Train Ride", "Monastery Visits", "Photography"],
    nearbyAttractions: ["Tiger Hill", "Batasia Loop", "Padmaja Naidu Himalayan Zoological Park"],
    policies: {
      smoking: false,
      pets: false,
      parties: false,
      children: true,
    },
    safety: ["Mountain Safety Guidelines", "First Aid Kit", "Emergency Contacts"],
  },
];

export const getListings = (filters = {}) => {
  let filteredListings = [...mockListings];
  
  if (filters.location) {
    filteredListings = filteredListings.filter(listing => 
      listing.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  if (filters.priceMin) {
    filteredListings = filteredListings.filter(listing => 
      listing.price >= filters.priceMin
    );
  }
  
  if (filters.priceMax) {
    filteredListings = filteredListings.filter(listing => 
      listing.price <= filters.priceMax
    );
  }
  
  if (filters.type) {
    filteredListings = filteredListings.filter(listing => 
      listing.type.toLowerCase() === filters.type.toLowerCase()
    );
  }
  
  if (filters.guests) {
    filteredListings = filteredListings.filter(listing => 
      listing.maxGuests >= filters.guests
    );
  }
  
  if (filters.instantBook) {
    filteredListings = filteredListings.filter(listing => 
      listing.instantBook === true
    );
  }
  
  return filteredListings;
};

export const getListingById = (id) => {
  return mockListings.find(listing => listing.id === parseInt(id));
};

export const getFeaturedListings = () => {
  return mockListings.filter(listing => listing.rating >= 4.8).slice(0, 3);
};

export const getTrendingDestinations = () => {
  const destinations = mockListings.map(listing => ({
    location: listing.location,
    image: listing.images[0],
    count: Math.floor(Math.random() * 50) + 10,
  }));
  
  const uniqueDestinations = destinations.filter((dest, index, self) =>
    index === self.findIndex(d => d.location === dest.location)
  );
  
  return uniqueDestinations.slice(0, 6);
};