import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Review } from '../types/review';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RatingTrendsChartProps {
  reviews: Review[];
}

export const RatingTrendsChart: React.FC<RatingTrendsChartProps> = ({ reviews }) => {
  const chartData = useMemo(() => {
    const ratedReviews = reviews
      .filter(review => review.overallRating !== null)
      .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());

    if (ratedReviews.length === 0) {
      return {
        labels: ['No data'],
        datasets: [
          {
            label: 'Average Rating',
            data: [0],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      };
    }

    const monthlyData: { [key: string]: number[] } = {};
    
    ratedReviews.forEach(review => {
      const date = new Date(review.submittedAt);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = [];
      }
      
      if (review.overallRating !== null) {
        monthlyData[monthKey].push(review.overallRating);
      }
    });

    const labels = Object.keys(monthlyData).sort();
    const averages = labels.map(month => {
      const ratings = monthlyData[month];
      const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      return Number(average.toFixed(2));
    });

    const formattedLabels = labels.map(label => {
      const [year, month] = label.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
      });
    });

    return {
      labels: formattedLabels,
      datasets: [
        {
          label: 'Average Rating',
          data: averages,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          tension: 0.3,
          fill: true,
        },
        {
          label: 'Target (8.0)',
          data: Array(averages.length).fill(8),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
        },
      ],
    };
  }, [reviews]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rating Trends Over Time',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Rating (0-10)',
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
