import React, { useMemo } from 'react';
import { Review } from '../types/review';
import { Star, TrendingUp, AlertCircle, MessageCircle } from 'lucide-react';

interface StatsOverviewProps {
  reviews: Review[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ reviews }) => {
    const stats = useMemo(() => {
        const totalReviews = reviews.length;
        const approvedReviews = reviews.filter(r => r.isApproved).length;
        
        const ratings = reviews
          .map(r => r.overallRating)
          .filter((rating): rating is number => rating !== null); // This filters out null values
        
        const averageRating = ratings.length > 0 
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
          : 0;
      
        const lowRatings = reviews.filter(r => 
          r.overallRating !== null && r.overallRating < 7
        ).length;
      
        const guestToHost = reviews.filter(r => r.type === 'guest-to-host').length;
      
        return {
          totalReviews,
          approvedReviews,
          averageRating: averageRating.toFixed(1),
          lowRatings,
          guestToHost,
          approvalRate: totalReviews > 0 ? (approvedReviews / totalReviews * 100).toFixed(1) : '0',
        };
      }, [reviews]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Reviews</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalReviews}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Average Rating</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.averageRating}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Low Ratings (&lt;7)</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.lowRatings}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Approval Rate</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.approvalRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
