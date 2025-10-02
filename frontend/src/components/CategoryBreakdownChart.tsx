import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Review } from '../types/review';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryBreakdownChartProps {
  reviews: Review[];
}

export const CategoryBreakdownChart: React.FC<CategoryBreakdownChartProps> = ({ reviews }) => {
  const chartData = useMemo(() => {
    const categorySums: { [key: string]: { sum: number; count: number } } = {};
    
    reviews.forEach(review => {
      Object.entries(review.categories).forEach(([category, rating]) => {
        if (rating !== null) {
          if (!categorySums[category]) {
            categorySums[category] = { sum: 0, count: 0 };
          }
          categorySums[category].sum += rating;
          categorySums[category].count += 1;
        }
      });
    });

    const categories = Object.keys(categorySums);
    const averages = categories.map(category => 
      categorySums[category].sum / categorySums[category].count
    );

    return {
      labels: categories.map(cat => 
        cat.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      ),
      datasets: [
        {
          label: 'Average Rating',
          data: averages,
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)',
            'rgb(239, 68, 68)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [reviews]);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Ratings by Category',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Average Rating',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
