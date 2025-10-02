import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Review } from '../types/review';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ReviewDistributionChartProps {
  reviews: Review[];
}

export const ReviewDistributionChart: React.FC<ReviewDistributionChartProps> = ({ reviews }) => {
  const chartData = useMemo(() => {
    const ratingRanges = {
      'Excellent (9-10)': 0,
      'Good (7-8.9)': 0,
      'Average (5-6.9)': 0,
      'Poor (0-4.9)': 0,
    };

    reviews.forEach(review => {
      if (review.overallRating !== null) {
        if (review.overallRating >= 9) {
          ratingRanges['Excellent (9-10)']++;
        } else if (review.overallRating >= 7) {
          ratingRanges['Good (7-8.9)']++;
        } else if (review.overallRating >= 5) {
          ratingRanges['Average (5-6.9)']++;
        } else {
          ratingRanges['Poor (0-4.9)']++;
        }
      }
    });

    const labels = Object.keys(ratingRanges);
    const data = Object.values(ratingRanges);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(101, 163, 13, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderColor: [
            'rgb(16, 185, 129)',
            'rgb(101, 163, 13)',
            'rgb(245, 158, 11)',
            'rgb(239, 68, 68)',
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [reviews]);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Review Distribution by Rating',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="h-80">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};
