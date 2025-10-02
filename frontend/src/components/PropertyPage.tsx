import React from 'react';
import { useQuery } from 'react-query';
import { reviewsApi } from '../services/api';
import { Star } from 'lucide-react';

interface PropertyPageProps {
  propertyName: string;
}

export const PropertyPage: React.FC<PropertyPageProps> = ({ propertyName }) => {
  const { data } = useQuery('reviews', reviewsApi.getHostawayReviews);

  const approvedReviews = data?.data.filter(
    review => review.listingName === propertyName && review.isApproved
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Property Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{propertyName}</h1>
          <p className="text-xl mt-2 text-gray-300">Luxury Living Experience</p>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Property images, description, amenities would go here */}
            <div className="prose max-w-none">
              <h2>About this property</h2>
              <p>Beautiful modern apartment in the heart of the city...</p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
              
              {approvedReviews.length > 0 ? (
                <div className="space-y-6">
                  {approvedReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center mb-2">
                        {review.overallRating && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-semibold">
                              {review.overallRating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3">"{review.publicReview}"</p>
                      <p className="text-sm text-gray-600 font-semibold">
                        - {review.guestName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No reviews yet. Check back soon!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
