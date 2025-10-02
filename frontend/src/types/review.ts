export interface ReviewCategory {
    cleanliness: number | null;
    communication: number | null;
    respect_house_rules: number | null;
    [key: string]: number | null;
  }
  
  export interface Review {
    id: number;
    type: string;
    status: string;
    overallRating: number | null; // Changed from number to number | null
    publicReview: string;
    categories: ReviewCategory;
    submittedAt: string;
    guestName: string;
    listingName: string;
    channel: 'hostaway' | 'google';
    isApproved: boolean;
    date: Date;
  }
  
  export interface ReviewsResponse {
    status: string;
    data: Review[];
    metadata: {
      total: number;
      listings: string[];
      channels: string[];
    };
  }
  
  export interface FilterOptions {
    listing: string;
    rating: string;
    channel: string;
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
    type: string;
  }
