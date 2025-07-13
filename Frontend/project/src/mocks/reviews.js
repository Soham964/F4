export const mockReviews = [
  {
    id: 1,
    listingId: 1,
    userId: 1,
    userName: "Amit Patel",
    userAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    date: "2024-02-15",
    title: "Perfect mountain retreat!",
    comment: "The cabin was absolutely perfect for our family getaway. Ravi was an excellent host, and the views were breathtaking. The kids loved the hiking trails, and we enjoyed the organic meals. Will definitely return!",
    helpful: 12,
    images: [],
    verified: true,
  },
  {
    id: 2,
    listingId: 1,
    userId: 2,
    userName: "Sarah Johnson",
    userAvatar: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    date: "2024-01-28",
    title: "Incredible experience",
    comment: "This was our first time visiting Himachal, and it exceeded all expectations. The cabin is cozy and well-equipped. The host arranged amazing local experiences. Highly recommend for nature lovers!",
    helpful: 8,
    images: [],
    verified: true,
  },
  {
    id: 3,
    listingId: 2,
    userId: 3,
    userName: "Rajesh Kumar",
    userAvatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    date: "2024-02-20",
    title: "Magical backwater experience",
    comment: "The houseboat was beautiful and comfortable. Priya and her team provided excellent service. The food was delicious, and the backwater cruise was serene. Perfect for a romantic getaway!",
    helpful: 15,
    images: [],
    verified: true,
  },
  {
    id: 4,
    listingId: 2,
    userId: 4,
    userName: "Lisa Chen",
    userAvatar: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    date: "2024-01-10",
    title: "Peaceful and authentic",
    comment: "Loved the authentic Kerala experience. The houseboat was well-maintained, and the crew was friendly. Only minor issue was the mosquitoes in the evening, but that's expected in backwaters.",
    helpful: 6,
    images: [],
    verified: true,
  },
  {
    id: 5,
    listingId: 3,
    userId: 5,
    userName: "Mike Thompson",
    userAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    date: "2024-02-05",
    title: "Desert adventure of a lifetime",
    comment: "The desert camp was luxurious and the experience was unforgettable. Camel rides, folk performances, and stargazing were highlights. Vikram was knowledgeable and entertaining. Perfect for groups!",
    helpful: 18,
    images: [],
    verified: true,
  },
  {
    id: 6,
    listingId: 4,
    userId: 6,
    userName: "Priya Sharma",
    userAvatar: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    date: "2024-01-18",
    title: "Charming beach cottage",
    comment: "The cottage was cute and just steps from the beach. Maria was very helpful with local recommendations. Great for a peaceful retreat. Would love to stay longer next time!",
    helpful: 9,
    images: [],
    verified: true,
  },
  {
    id: 7,
    listingId: 5,
    userId: 7,
    userName: "David Lee",
    userAvatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    date: "2024-02-12",
    title: "Spiritual awakening",
    comment: "This eco-lodge is a gem! The yoga sessions were transformative, and the riverside location is peaceful. Swami Anand is a wonderful host. Perfect place for spiritual seekers and nature lovers.",
    helpful: 14,
    images: [],
    verified: true,
  },
  {
    id: 8,
    listingId: 6,
    userId: 8,
    userName: "Emma Wilson",
    userAvatar: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    date: "2024-01-25",
    title: "Tea garden paradise",
    comment: "The bungalow is charming with incredible views. Tenzin shared amazing stories about the region. Tea garden tours were educational and fun. Best sunrise views ever! Highly recommend.",
    helpful: 11,
    images: [],
    verified: true,
  },
];

export const getReviewsByListingId = (listingId) => {
  return mockReviews.filter(review => review.listingId === parseInt(listingId));
};

export const getReviewStats = (listingId) => {
  const reviews = getReviewsByListingId(listingId);
  
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    };
  }
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  
  reviews.forEach(review => {
    ratingDistribution[review.rating]++;
  });
  
  return {
    totalReviews: reviews.length,
    averageRating: Number(averageRating.toFixed(1)),
    ratingDistribution,
  };
};

export const addReview = (review) => {
  const newReview = {
    id: mockReviews.length + 1,
    ...review,
    date: new Date().toISOString().split('T')[0],
    helpful: 0,
    verified: true,
  };
  
  mockReviews.push(newReview);
  return newReview;
};

export const markReviewHelpful = (reviewId) => {
  const review = mockReviews.find(r => r.id === parseInt(reviewId));
  if (review) {
    review.helpful++;
  }
  return review;
};

export const getRecentReviews = (limit = 5) => {
  return mockReviews
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const getTopRatedReviews = (limit = 5) => {
  return mockReviews
    .filter(review => review.rating === 5)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, limit);
};