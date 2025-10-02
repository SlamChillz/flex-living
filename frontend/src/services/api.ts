import axios from 'axios';
import { ReviewsResponse } from '../types/review';
import { config } from '../config';

export const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
});

export const reviewsApi = {
  getHostawayReviews: (): Promise<ReviewsResponse> =>
    api.get('/reviews/hostaway').then(response => response.data),
  
  updateReviewApproval: (reviewId: number, isApproved: boolean): Promise<any> =>
    api.patch(`/reviews/${reviewId}/approval`, { isApproved }),
};
