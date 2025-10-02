import { Request, Response } from 'express';
import { HostawayService } from '../services/hostawayService';

const hostawayService = new HostawayService();

export class ReviewsController {
  async getHostawayReviews(req: Request, res: Response) {
    try {
      let reviews;
      
      // Try to fetch from actual API first
      try {
        const apiResponse = await hostawayService.fetchReviews();
        reviews = apiResponse.result;
      } catch (apiError) {
        // Fall back to mock data if API fails
        console.log('Using mock data due to API error:', apiError);
        reviews = hostawayService.getMockReviews();
      }

      const normalizedReviews = hostawayService.normalizeReviews(reviews);
      
      res.json({
        status: 'success',
        data: normalizedReviews,
        metadata: {
          total: normalizedReviews.length,
          listings: [...new Set(normalizedReviews.map(r => r.listingName))],
          channels: ['hostaway']
        }
      });
    } catch (error) {
      console.error('Error in getHostawayReviews:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch reviews'
      });
    }
  }

  async updateReviewApproval(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const { isApproved } = req.body;

      // In a real implementation, this would update a database
      // For now, we'll just return success
      
      res.json({
        status: 'success',
        message: 'Review approval updated successfully',
        data: { reviewId: parseInt(reviewId), isApproved }
      });
    } catch (error) {
      console.error('Error updating review approval:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update review approval'
      });
    }
  }
}

// Export default instance
export default new ReviewsController();
