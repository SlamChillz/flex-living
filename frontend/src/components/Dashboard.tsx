import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { reviewsApi } from '../services/api';
import { Review, FilterOptions } from '../types/review';
import { FilterBar } from './FilterBar';
import { ReviewList } from './ReviewList';
import { StatsOverview } from './StatsOverview';
import { RatingTrendsChart } from './RatingTrendsChart';
import { CategoryBreakdownChart } from './CategoryBreakdownChart';
import { ReviewDistributionChart } from './ReviewDistributionChart';

export const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FilterOptions>({
    listing: '',
    rating: '',
    channel: '',
    dateRange: { start: null, end: null },
    type: '',
  });

  const { data, isLoading, error } = useQuery('reviews', reviewsApi.getHostawayReviews);
  
  const updateApprovalMutation = useMutation(
    ({ reviewId, isApproved }: { reviewId: number; isApproved: boolean }) =>
      reviewsApi.updateReviewApproval(reviewId, isApproved),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reviews');
      },
    }
  );

  const filteredReviews = useMemo(() => {
    if (!data?.data) return [];
    
    return data.data.filter((review: Review) => {
      if (filters.listing && review.listingName !== filters.listing) return false;
      if (filters.rating) {
        const rating = review.overallRating;
        if (!rating) return false;
        
        const minRating = parseInt(filters.rating);
        if (rating < minRating) return false;
      }
      if (filters.channel && review.channel !== filters.channel) return false;
      if (filters.type && review.type !== filters.type) return false;
      
      if (filters.dateRange.start && review.date < filters.dateRange.start) return false;
      if (filters.dateRange.end && review.date > filters.dateRange.end) return false;
      
      return true;
    });
  }, [data, filters]);

  const handleApproveToggle = (reviewId: number, isApproved: boolean) => {
    updateApprovalMutation.mutate({ reviewId, isApproved });
  };

  const handleApproveAllHighRated = () => {
    const highRated = filteredReviews.filter(
      r => !r.isApproved && r.overallRating && r.overallRating >= 8
    );
    highRated.forEach(review => {
      handleApproveToggle(review.id, true);
    });
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading reviews...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="text-center">
        <div className="text-red-500 text-lg">Error loading reviews</div>
        <p className="text-gray-600 mt-2">Please check your connection and try again</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
          <p className="text-gray-600">Manage and analyze guest reviews across all properties</p>
        </div>

        {/* Filters */}
        <FilterBar 
          filters={filters} 
          onFiltersChange={setFilters}
          listings={data?.metadata.listings || []}
        />

        {/* Stats Overview */}
        <StatsOverview reviews={filteredReviews} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RatingTrendsChart reviews={filteredReviews} />
          <CategoryBreakdownChart reviews={filteredReviews} />
        </div>

        {/* Quick Actions and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <ReviewDistributionChart reviews={filteredReviews} />
          </div>
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-blue-900">Pending Reviews</h4>
                  <p className="text-blue-700">
                    {filteredReviews.filter(r => !r.isApproved).length} reviews need approval
                  </p>
                </div>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={handleApproveAllHighRated}
                  disabled={filteredReviews.filter(r => !r.isApproved && r.overallRating && r.overallRating >= 8).length === 0}
                >
                  Approve 8+ Stars
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-red-900">Low Ratings</h4>
                  <p className="text-red-700">
                    {filteredReviews.filter(r => r.overallRating && r.overallRating < 7).length} reviews below 7 stars
                  </p>
                </div>
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      rating: '0'
                    }));
                  }}
                >
                  View Low Ratings
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-green-900">Approval Summary</h4>
                  <p className="text-green-700">
                    {filteredReviews.filter(r => r.isApproved).length} of {filteredReviews.length} reviews approved
                  </p>
                </div>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  onClick={() => {
                    // Filter to show only approved reviews
                    setFilters(prev => ({
                      ...prev,
                      // This would need additional filter state for approval status
                    }));
                  }}
                >
                  View Approved
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <ReviewList 
          reviews={filteredReviews}
          onApproveToggle={handleApproveToggle}
        />
      </div>
    </div>
  );
};
