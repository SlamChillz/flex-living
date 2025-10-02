import axios from 'axios';
import { HostawayApiResponse, NormalizedReview, HostawayReview, HostawayReviewCategory } from '../types/hostaway';

const HOSTAWAY_API_BASE = process.env.HOSTAWAY_API_BASE || 'https://api.hostaway.com/v1';
const ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID || '52267';
const API_KEY = process.env.HOSTAWAY_API_KEY || 'f94377ebbbb479490bb3ec364649';

export class HostawayService {
  private api = axios.create({
    baseURL: HOSTAWAY_API_BASE,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  async fetchReviews(): Promise<HostawayApiResponse> {
    try {
      const response = await this.api.get('/reviews', {
        params: { accountId: ACCOUNT_ID }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Hostaway reviews:', error);
      throw new Error('Failed to fetch reviews from Hostaway');
    }
  }

  normalizeReviews(hostawayReviews: HostawayReview[]): NormalizedReview[] {
    return hostawayReviews.map(review => {
      // Calculate overall rating from categories
      const categories = review.reviewCategory || [];
      const validRatings = categories.filter((cat: HostawayReviewCategory) => cat.rating !== null);
      const overallRating = validRatings.length > 0 
        ? validRatings.reduce((sum: number, cat: HostawayReviewCategory) => sum + cat.rating, 0) / validRatings.length
        : null;

      // Normalize categories with proper typing
      const normalizedCategories: { [key: string]: number | null; cleanliness: number | null; communication: number | null; respect_house_rules: number | null } = {
        cleanliness: null,
        communication: null,
        respect_house_rules: null,
      };

      // Populate category ratings
      categories.forEach((cat: HostawayReviewCategory) => {
        normalizedCategories[cat.category] = cat.rating;
      });

      return {
        id: review.id,
        type: review.type,
        status: review.status,
        overallRating,
        publicReview: review.publicReview,
        categories: normalizedCategories,
        submittedAt: review.submittedAt,
        guestName: review.guestName,
        listingName: review.listingName,
        channel: 'hostaway' as const,
        isApproved: false,
        date: new Date(review.submittedAt)
      };
    });
  }

  // Mock data for development with proper typing
  getMockReviews(): HostawayReview[] {
    return [
      {
        id: 7453,
        type: "host-to-guest",
        status: "published",
        rating: null,
        publicReview: "Shane and family are wonderful! Would definitely host again :)",
        reviewCategory: [
          { category: "cleanliness", rating: 10 },
          { category: "communication", rating: 10 },
          { category: "respect_house_rules", rating: 10 }
        ],
        submittedAt: "2020-08-21 22:45:14",
        guestName: "Shane Finkelstein",
        listingName: "2B N1 A - 29 Shoreditch Heights"
      },
      {
        id: 7454,
        type: "guest-to-host",
        status: "published",
        rating: null,
        publicReview: "Great stay! The apartment was clean and well-located.",
        reviewCategory: [
          { category: "cleanliness", rating: 9 },
          { category: "communication", rating: 8 },
          { category: "location", rating: 10 }
        ],
        submittedAt: "2020-08-22 10:30:00",
        guestName: "Maria Rodriguez",
        listingName: "2B N1 A - 29 Shoreditch Heights"
      },
      {
        id: 7455,
        type: "guest-to-host",
        status: "published",
        rating: null,
        publicReview: "Good value for money but could be cleaner.",
        reviewCategory: [
          { category: "cleanliness", rating: 6 },
          { category: "communication", rating: 9 },
          { category: "value", rating: 8 }
        ],
        submittedAt: "2020-08-23 15:20:00",
        guestName: "John Smith",
        listingName: "Studio Loft - Downtown"
      },
      {
        id: 7456,
        type: "guest-to-host",
        status: "published",
        rating: null,
        publicReview: "Amazing experience! Will come back for sure.",
        reviewCategory: [
          { category: "cleanliness", rating: 10 },
          { category: "communication", rating: 10 },
          { category: "location", rating: 9 },
          { category: "value", rating: 9 }
        ],
        submittedAt: "2020-09-01 09:15:00",
        guestName: "Emily Chen",
        listingName: "Luxury Penthouse - City Center"
      },
      {
        id: 7457,
        type: "host-to-guest",
        status: "published",
        rating: null,
        publicReview: "Excellent guests, very respectful of the property.",
        reviewCategory: [
          { category: "respect_house_rules", rating: 10 },
          { category: "communication", rating: 9 }
        ],
        submittedAt: "2020-09-02 14:30:00",
        guestName: "David Wilson",
        listingName: "Studio Loft - Downtown"
      }
    ];
  }
}
