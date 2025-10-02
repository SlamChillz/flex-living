import React from 'react';
import { Review } from '../types/review';
import { Star, CheckCircle, XCircle, Calendar, MessageCircle } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  onApproveToggle: (reviewId: number, isApproved: boolean) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, onApproveToggle }) => {
  const getRatingColor = (rating: number | null) => {
    if (!rating) return 'text-gray-400';
    if (rating >= 9) return 'text-green-600';
    if (rating >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingBgColor = (rating: number | null) => {
    if (!rating) return 'bg-gray-100';
    if (rating >= 9) return 'bg-green-100';
    if (rating >= 7) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Reviews ({reviews.length})
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Approved ({reviews.filter(r => r.isApproved).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Pending ({reviews.filter(r => !r.isApproved).length})</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {reviews.map((review) => {
          return (
            <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center px-3 py-1 rounded-full ${getRatingBgColor(review.overallRating)}`}>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className={`ml-1 text-sm font-semibold ${getRatingColor(review.overallRating)}`}>
                        {review.overallRating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.guestName}</h4>
                    <p className="text-sm text-gray-600">{review.listingName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(review.submittedAt)}
                  </div>
                  
                  <button
                    onClick={() => onApproveToggle(review.id, !review.isApproved)}
                    className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      review.isApproved
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {review.isApproved ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approved
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-1" />
                        Approve
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4 flex items-start">
                <MessageCircle className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span>{review.publicReview}</span>
              </p>

              {Object.keys(review.categories).length > 0 && (
                <div className="flex flex-wrap gap-4 mb-4">
                  {Object.entries(review.categories).map(([category, rating]) => (
                    rating !== null && (
                      <div key={category} className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded">
                        <span className="text-gray-600 capitalize mr-2">
                          {category.replace(/_/g, ' ')}:
                        </span>
                        <span className={`font-semibold ${getRatingColor(rating)}`}>
                          {rating}/10
                        </span>
                      </div>
                    )
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div className="flex space-x-4">
                  <span className={`px-2 py-1 rounded capitalize ${
                    review.type === 'guest-to-host' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {review.type.replace(/-/g, ' ')}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded capitalize">
                    {review.channel}
                  </span>
                  <span className={`px-2 py-1 rounded capitalize ${
                    review.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No reviews match the current filters</p>
          <p className="text-sm">Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
};
