export interface HostawayReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: HostawayReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
}

export interface HostawayApiResponse {
  status: string;
  result: HostawayReview[];
}

// Corrected Normalized Review Interface
export interface NormalizedReview {
  id: number;
  type: string;
  status: string;
  overallRating: number | null; // Changed from number to number | null
  publicReview: string;
  categories: {
    cleanliness: number | null;
    communication: number | null;
    respect_house_rules: number | null;
    [key: string]: number | null;
  };
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel: 'hostaway';
  isApproved: boolean;
  date: Date;
}
