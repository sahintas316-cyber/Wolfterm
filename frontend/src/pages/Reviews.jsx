import React, { useState, useEffect } from 'react';
import { reviews as mockReviews } from '../mock/data';
import { api } from '../services/api';
import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Reviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Keep using mock data on error
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">Отзывы покупателей</h1>
          <p className="text-xl text-gray-600">
            Что говорят наши клиенты о продукции WolfTerm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <CardDescription>{review.city}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('ru-RU')}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;